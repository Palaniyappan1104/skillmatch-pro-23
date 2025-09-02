import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { mockJobs, mockApplications } from '@/lib/mockData';
import { 
  Briefcase, 
  Users, 
  TrendingUp, 
  Calendar,
  Plus,
  BarChart3,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();

  // Calculate admin statistics (in real app, this would filter by admin's posted jobs)
  const totalJobs = mockJobs.length;
  const totalApplications = mockApplications.length;
  const interviewRate = Math.round((mockApplications.filter(app => app.status === 'Interview').length / totalApplications) * 100);
  const offerRate = Math.round((mockApplications.filter(app => app.status === 'Offer').length / totalApplications) * 100);

  // Recent job postings (mock data)
  const recentJobs = mockJobs.slice(0, 3).map(job => ({
    ...job,
    applicationsCount: mockApplications.filter(app => app.jobId === job.id).length
  }));

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground mt-2">
                Welcome back, {user?.name}! Here's your hiring overview
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button asChild>
                <Link to="/admin/jobs">
                  <Plus className="h-4 w-4 mr-2" />
                  Post New Job
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/admin/responses">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card backdrop-blur-sm border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Jobs Posted</p>
                  <p className="text-2xl font-bold">{totalJobs}</p>
                </div>
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <div className="flex items-center mt-2 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+2 this month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card backdrop-blur-sm border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Applications</p>
                  <p className="text-2xl font-bold">{totalApplications}</p>
                </div>
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <div className="flex items-center mt-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1" />
                <span>Last 30 days</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card backdrop-blur-sm border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Interview Rate</p>
                  <p className="text-2xl font-bold">{interviewRate}%</p>
                </div>
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
              <div className="mt-2">
                <Progress value={interviewRate} className="h-1" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card backdrop-blur-sm border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Offer Rate</p>
                  <p className="text-2xl font-bold">{offerRate}%</p>
                </div>
                <AlertCircle className="h-8 w-8 text-warning" />
              </div>
              <div className="mt-2">
                <Progress value={offerRate} className="h-1" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Jobs */}
          <div className="lg:col-span-2">
            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Job Postings</CardTitle>
                    <CardDescription>
                      Your latest job posts and their performance
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/admin/jobs">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentJobs.map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{job.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {job.company} • {job.location}
                        </p>
                        <div className="flex items-center mt-2 space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {job.type}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {job.experience}
                          </Badge>
                          {job.remote && (
                            <Badge variant="outline" className="text-xs">
                              Remote
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-lg font-semibold">
                          {job.applicationsCount}
                        </div>
                        <p className="text-xs text-muted-foreground">applications</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {getTimeAgo(job.postedAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-md">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" asChild>
                  <Link to="/admin/jobs">
                    <Plus className="h-4 w-4 mr-2" />
                    Post New Job
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/admin/responses">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Export Reports
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-md">
              <CardHeader>
                <CardTitle>Application Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">New Applications</span>
                  <Badge variant="secondary">
                    {mockApplications.filter(app => app.status === 'Applied').length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">In Interview</span>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    {mockApplications.filter(app => app.status === 'Interview').length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Offers Extended</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {mockApplications.filter(app => app.status === 'Offer').length}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-primary text-primary-foreground">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Hiring Insights</h3>
                <p className="text-sm text-primary-foreground/90 mb-4">
                  Your Frontend Engineer position is receiving the most applications. Consider similar roles.
                </p>
                <Button variant="secondary" size="sm">
                  View Trends
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;