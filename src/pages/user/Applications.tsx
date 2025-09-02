import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/auth';
import { mockApplications, mockJobs, getApplicationsByUserId, getJobById } from '@/lib/mockData';
import { 
  Search, 
  Filter, 
  Calendar, 
  Building, 
  ExternalLink,
  Edit,
  Trash2,
  Plus,
  ChevronDown,
  Eye,
  Briefcase
} from 'lucide-react';

const Applications = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Get user's applications
  const userApplications = user ? getApplicationsByUserId(user.id) : [];

  // Filter and sort applications
  const filteredApplications = userApplications
    .filter(app => {
      const job = getJobById(app.jobId);
      if (!job) return false;
      
      const matchesSearch = searchTerm === '' || 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime();
      }
      const jobA = getJobById(a.jobId);
      const jobB = getJobById(b.jobId);
      if (sortBy === 'company') {
        return (jobA?.company || '').localeCompare(jobB?.company || '');
      }
      if (sortBy === 'title') {
        return (jobA?.title || '').localeCompare(jobB?.title || '');
      }
      return 0;
    });

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
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusStats = () => {
    const stats = userApplications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      total: userApplications.length,
      applied: stats['Applied'] || 0,
      interview: stats['Interview'] || 0,
      offer: stats['Offer'] || 0,
      rejected: stats['Rejected'] || 0,
    };
  };

  const stats = getStatusStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
              <p className="text-muted-foreground">
                Track your applications and statuses
              </p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Application
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <Card className="bg-gradient-card backdrop-blur-sm border-0">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{stats.total}</div>
                <div className="text-sm text-muted-foreground">Total</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-card backdrop-blur-sm border-0">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.applied}</div>
                <div className="text-sm text-muted-foreground">Applied</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-card backdrop-blur-sm border-0">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">{stats.interview}</div>
                <div className="text-sm text-muted-foreground">Interview</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-card backdrop-blur-sm border-0">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{stats.offer}</div>
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
        </div>

        {/* Filters */}
        <Card className="mb-6 bg-card/80 backdrop-blur-sm border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by role or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Applied">Applied</SelectItem>
                  <SelectItem value="Interview">Interview</SelectItem>
                  <SelectItem value="Offer">Offer</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                  <SelectItem value="Withdrawn">Withdrawn</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date Applied</SelectItem>
                  <SelectItem value="company">Company</SelectItem>
                  <SelectItem value="title">Job Title</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Applications Table */}
        <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Your Applications ({filteredApplications.length})</CardTitle>
            <CardDescription>
              Manage and track all your job applications in one place
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredApplications.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Role</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Applied</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApplications.map((application) => {
                      const job = getJobById(application.jobId);
                      if (!job) return null;
                      
                      return (
                        <TableRow key={application.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{job.title}</div>
                              <div className="text-sm text-muted-foreground">
                                {job.location} • {job.type}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                              {job.company}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                              {formatDate(application.appliedAt)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className={getStatusColor(application.status)}>
                              {application.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>{job.title} at {job.company}</DialogTitle>
                                    <DialogDescription>
                                      Application details and status
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label>Applied Date</Label>
                                        <p className="text-sm text-muted-foreground">
                                          {formatDate(application.appliedAt)}
                                        </p>
                                      </div>
                                      <div>
                                        <Label>Current Status</Label>
                                        <Badge variant="secondary" className={`mt-1 ${getStatusColor(application.status)}`}>
                                          {application.status}
                                        </Badge>
                                      </div>
                                    </div>
                                    
                                    <div>
                                      <Label>Job Description</Label>
                                      <p className="text-sm text-muted-foreground mt-1">
                                        {job.description}
                                      </p>
                                    </div>
                                    
                                    <div>
                                      <Label>Required Skills</Label>
                                      <div className="flex flex-wrap gap-2 mt-1">
                                        {job.skills.map((skill) => (
                                          <Badge key={skill} variant="outline" className="text-xs">
                                            {skill}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                    
                                    {application.notes && (
                                      <div>
                                        <Label>Notes</Label>
                                        <p className="text-sm text-muted-foreground mt-1">
                                          {application.notes}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </DialogContent>
                              </Dialog>
                              
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              
                              <Button variant="ghost" size="sm">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12">
                <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No applications found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Try adjusting your search or filter criteria.'
                    : 'Start applying for jobs to track your progress here.'
                  }
                </p>
                {(!searchTerm && statusFilter === 'all') && (
                  <Button asChild>
                    <a href="/jobs">Browse Jobs</a>
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Applications;