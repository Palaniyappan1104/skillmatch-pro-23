import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { mockJobs, mockApplications, getJobById } from '@/lib/mockData';
import { 
  BarChart3, 
  Download, 
  Filter,
  TrendingUp,
  Users,
  Calendar,
  Eye,
  Mail,
  Phone
} from 'lucide-react';

const AdminResponses = () => {
  const [selectedJob, setSelectedJob] = useState<string>('all');
  const [dateRange, setDateRange] = useState('30');

  // Calculate application statistics
  const getJobApplicationStats = () => {
    const filteredApps = selectedJob === 'all' 
      ? mockApplications 
      : mockApplications.filter(app => app.jobId === selectedJob);

    const stats = {
      total: filteredApps.length,
      applied: filteredApps.filter(app => app.status === 'Applied').length,
      interview: filteredApps.filter(app => app.status === 'Interview').length,
      rejected: filteredApps.filter(app => app.status === 'Rejected').length,
      offers: filteredApps.filter(app => app.status === 'Offer').length,
      withdrawn: filteredApps.filter(app => app.status === 'Withdrawn').length
    };

    return stats;
  };

  const stats = getJobApplicationStats();

  // Calculate conversion rates
  const conversionRates = {
    applicationToInterview: stats.total > 0 ? Math.round((stats.interview / stats.total) * 100) : 0,
    interviewToOffer: stats.interview > 0 ? Math.round((stats.offers / stats.interview) * 100) : 0,
    overallConversion: stats.total > 0 ? Math.round((stats.offers / stats.total) * 100) : 0
  };

  // Get job performance data
  const getJobPerformance = () => {
    return mockJobs.map(job => {
      const jobApps = mockApplications.filter(app => app.jobId === job.id);
      const totalApps = jobApps.length;
      const interviews = jobApps.filter(app => app.status === 'Interview').length;
      const offers = jobApps.filter(app => app.status === 'Offer').length;
      
      return {
        ...job,
        applications: totalApps,
        interviews: interviews,
        offers: offers,
        conversionRate: totalApps > 0 ? Math.round((interviews / totalApps) * 100) : 0,
        offerRate: interviews > 0 ? Math.round((offers / interviews) * 100) : 0
      };
    }).sort((a, b) => b.applications - a.applications);
  };

  const jobPerformance = getJobPerformance();

  // Get recent applications
  const getRecentApplications = () => {
    const filteredApps = selectedJob === 'all' 
      ? mockApplications 
      : mockApplications.filter(app => app.jobId === selectedJob);
    
    return filteredApps
      .sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime())
      .slice(0, 10)
      .map(app => ({
        ...app,
        job: getJobById(app.jobId)
      }));
  };

  const recentApplications = getRecentApplications();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Applied': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Interview': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Offer': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'Withdrawn': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Application Analytics</h1>
              <p className="text-muted-foreground mt-2">
                Track application responses and hiring funnel performance
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-8 bg-card/80 backdrop-blur-sm border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Select value={selectedJob} onValueChange={setSelectedJob}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select job posting" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Job Postings</SelectItem>
                    {mockJobs.map((job) => (
                      <SelectItem key={job.id} value={job.id}>
                        {job.title} at {job.company}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card className="bg-gradient-card backdrop-blur-sm border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total Applications</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card backdrop-blur-sm border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.applied}</div>
              <div className="text-sm text-muted-foreground">New</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card backdrop-blur-sm border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.interview}</div>
              <div className="text-sm text-muted-foreground">In Interview</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card backdrop-blur-sm border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.offers}</div>
              <div className="text-sm text-muted-foreground">Offers</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card backdrop-blur-sm border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
              <div className="text-sm text-muted-foreground">Rejected</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Conversion Funnel */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Hiring Funnel
                </CardTitle>
                <CardDescription>
                  Conversion rates through your hiring process
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Applications to Interview</span>
                      <span className="text-sm text-muted-foreground">{conversionRates.applicationToInterview}%</span>
                    </div>
                    <Progress value={conversionRates.applicationToInterview} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Interview to Offer</span>
                      <span className="text-sm text-muted-foreground">{conversionRates.interviewToOffer}%</span>
                    </div>
                    <Progress value={conversionRates.interviewToOffer} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Overall Conversion</span>
                      <span className="text-sm text-muted-foreground">{conversionRates.overallConversion}%</span>
                    </div>
                    <Progress value={conversionRates.overallConversion} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Performance */}
            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Job Performance
                </CardTitle>
                <CardDescription>
                  Application volume and conversion by job posting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobPerformance.map((job) => (
                    <div key={job.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{job.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{job.applications} applications</span>
                          <span>{job.conversionRate}% interview rate</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4 text-center">
                        <div>
                          <div className="font-semibold">{job.applications}</div>
                          <div className="text-xs text-muted-foreground">Applications</div>
                        </div>
                        <div>
                          <div className="font-semibold text-yellow-600">{job.interviews}</div>
                          <div className="text-xs text-muted-foreground">Interviews</div>
                        </div>
                        <div>
                          <div className="font-semibold text-green-600">{job.offers}</div>
                          <div className="text-xs text-muted-foreground">Offers</div>
                        </div>
                        <div>
                          <div className="font-semibold">{job.conversionRate}%</div>
                          <div className="text-xs text-muted-foreground">Conversion</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Applications */}
          <div className="space-y-6">
            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Recent Applications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentApplications.map((app) => (
                    <div key={app.id} className="border border-border rounded-lg p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h5 className="font-medium text-sm">{app.job?.title}</h5>
                          <p className="text-xs text-muted-foreground">
                            Applied {formatDate(app.appliedAt)}
                          </p>
                        </div>
                        <Badge variant="secondary" className={`text-xs ${getStatusColor(app.status)}`}>
                          {app.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Mail className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-secondary text-secondary-foreground">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Quick Insights</h3>
                <div className="space-y-2 text-sm">
                  <p>• Frontend positions get 2x more applications</p>
                  <p>• Remote jobs have 40% higher conversion</p>
                  <p>• Response time affects interview rates</p>
                </div>
                <Button variant="secondary" size="sm" className="mt-4">
                  View Full Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminResponses;