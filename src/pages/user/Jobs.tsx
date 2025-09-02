import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { mockJobs, getJobsByFilters, Job } from '@/lib/mockData';
import { 
  Search, 
  MapPin, 
  Clock, 
  DollarSign, 
  Building, 
  Filter,
  BookmarkPlus,
  ExternalLink,
  Users,
  Calendar
} from 'lucide-react';

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [filters, setFilters] = useState({
    query: '',
    location: '',
    type: '',
    remote: undefined as boolean | undefined,
    experience: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  // Apply filters whenever filter state changes
  useEffect(() => {
    const filteredJobs = getJobsByFilters(filters);
    setJobs(filteredJobs);
  }, [filters]);

  const updateFilter = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      location: '',
      type: '',
      remote: undefined,
      experience: ''
    });
  };

  const formatSalary = (min: number, max: number) => {
    return `$${(min / 1000).toFixed(0)}K - $${(max / 1000).toFixed(0)}K`;
  };

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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Job Opportunities
          </h1>
          <p className="text-muted-foreground">
            Discover your next career opportunity from {mockJobs.length} available positions
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 bg-card/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search jobs, companies, or skills..."
                    value={filters.query}
                    onChange={(e) => updateFilter('query', e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Location"
                    value={filters.location}
                    onChange={(e) => updateFilter('location', e.target.value)}
                    className="pl-10 sm:w-48"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="sm:w-auto"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>

              {/* Advanced Filters */}
              {showFilters && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-border">
                  <Select onValueChange={(value) => updateFilter('type', value === 'all' ? '' : value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Job Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select onValueChange={(value) => updateFilter('experience', value === 'all' ? '' : value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="Entry">Entry Level</SelectItem>
                      <SelectItem value="Mid">Mid Level</SelectItem>
                      <SelectItem value="Senior">Senior Level</SelectItem>
                      <SelectItem value="Lead">Lead Level</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remote"
                      checked={filters.remote === true}
                      onCheckedChange={(checked) => updateFilter('remote', checked ? true : undefined)}
                    />
                    <label htmlFor="remote" className="text-sm font-medium">
                      Remote only
                    </label>
                  </div>

                  <Button variant="ghost" onClick={clearFilters} className="justify-start">
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {jobs.length} job{jobs.length !== 1 ? 's' : ''}
            {filters.query && ` for "${filters.query}"`}
            {filters.location && ` in ${filters.location}`}
          </p>
        </div>

        {/* Job Cards */}
        <div className="space-y-6">
          {jobs.map((job) => (
            <Card key={job.id} className="bg-card/80 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  {/* Job Info */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-semibold hover:text-primary transition-colors">
                          {job.title}
                        </h3>
                        <div className="flex items-center gap-2 ml-4">
                          <Button variant="ghost" size="sm">
                            <BookmarkPlus className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-muted-foreground mb-2">
                        <Building className="h-4 w-4 mr-1" />
                        <span className="font-medium">{job.company}</span>
                        <span className="mx-2">•</span>
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{job.location}</span>
                        {job.remote && (
                          <>
                            <span className="mx-2">•</span>
                            <Badge variant="secondary" className="text-xs">Remote</Badge>
                          </>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center">
                          <Badge variant="outline" className="text-xs">
                            {job.experience}
                          </Badge>
                        </div>
                        {job.salary && (
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            <span>{formatSalary(job.salary.min, job.salary.max)}</span>
                          </div>
                        )}
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{getTimeAgo(job.postedAt)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Job Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                      {job.description}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {job.skills.slice(0, 6).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {job.skills.length > 6 && (
                        <Badge variant="outline" className="text-xs">
                          +{job.skills.length - 6} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="lg:ml-6 space-y-2 lg:min-w-[140px]">
                    <Button className="w-full bg-gradient-primary hover:opacity-90">
                      Apply Now
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to={`/gap-analyzer?job=${job.id}`}>
                        Assess Fit
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {jobs.length === 0 && (
            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-md">
              <CardContent className="p-12 text-center">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or filters to find more opportunities.
                </p>
                <Button onClick={clearFilters}>
                  Clear all filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Load More */}
        {jobs.length > 0 && (
          <div className="mt-8 text-center">
            <Button variant="outline" size="lg">
              Load More Jobs
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;