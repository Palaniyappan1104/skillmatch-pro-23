import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/lib/supabaseAuth';
import { mockApplications, mockJobs, getApplicationsByUserId } from '@/lib/mockData';
import { 
  Briefcase, 
  Calendar, 
  TrendingUp, 
  Users, 
  ArrowRight, 
  Search,
  FileText,
  BarChart3,
  BookOpen,
  CheckCircle,
  Clock,
  AlertCircle,
  Target
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [showTour, setShowTour] = useState(true);
  const [tourStep, setTourStep] = useState(0);

  // Get user's applications for stats
  const userApplications = user ? getApplicationsByUserId(user.id) : [];
  
  // Calculate stats
  const stats = {
    totalApplications: userApplications.length,
    interviews: userApplications.filter(app => app.status === 'Interview').length,
    offers: userApplications.filter(app => app.status === 'Offer').length,
    newJobs: mockJobs.filter(job => {
      const postedDate = new Date(job.postedAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return postedDate > weekAgo;
    }).length
  };

  const tourSteps = [
    {
      title: "Welcome to SkillMatch+!",
      description: "Your personalized job search dashboard. Let's take a quick tour of the key features.",
      highlight: "dashboard"
    },
    {
      title: "Find Your Perfect Job",
      description: "Browse and search through thousands of job opportunities with advanced filters.",
      highlight: "jobs"
    },
    {
      title: "Build Your Resume",
      description: "Create ATS-friendly resumes with our professional templates and expert guidance.",
      highlight: "resume"
    },
    {
      title: "Track Applications", 
      description: "Keep track of all your job applications and their current status in one place.",
      highlight: "applications"
    },
    {
      title: "Analyze Your Fit",
      description: "Use our Gap Analyzer to see how well your resume matches job requirements.",
      highlight: "gap-analyzer"
    }
  ];

  const nextTourStep = () => {
    if (tourStep < tourSteps.length - 1) {
      setTourStep(tourStep + 1);
    } else {
      setShowTour(false);
    }
  };

  const skipTour = () => {
    setShowTour(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-muted-foreground mt-2">
                Here's what's happening with your job search today
              </p>
            </div>
            
            {showTour && (
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-primary-foreground text-primary">
                      Step {tourStep + 1} of {tourSteps.length}
                    </Badge>
                    <Button variant="ghost" size="sm" onClick={skipTour} className="text-primary-foreground hover:bg-primary-foreground/20">
                      Skip
                    </Button>
                  </div>
                  <h3 className="font-semibold mb-1">{tourSteps[tourStep].title}</h3>
                  <p className="text-sm text-primary-foreground/90 mb-3">
                    {tourSteps[tourStep].description}
                  </p>
                  <Button 
                    size="sm" 
                    onClick={nextTourStep}
                    className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  >
                    {tourStep === tourSteps.length - 1 ? 'Get Started' : 'Next'}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card backdrop-blur-sm border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Applications</p>
                  <p className="text-2xl font-bold">{stats.totalApplications}</p>
                </div>
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <div className="flex items-center mt-2 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+2 this week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card backdrop-blur-sm border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Interviews</p>
                  <p className="text-2xl font-bold">{stats.interviews}</p>
                </div>
                <Calendar className="h-8 w-8 text-secondary" />
              </div>
              <div className="flex items-center mt-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                <span>1 scheduled</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card backdrop-blur-sm border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Offers</p>
                  <p className="text-2xl font-bold">{stats.offers}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
              <div className="flex items-center mt-2 text-xs text-muted-foreground">
                <Target className="h-3 w-3 mr-1" />
                <span>1 pending</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card backdrop-blur-sm border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">New Jobs</p>
                  <p className="text-2xl font-bold">{stats.newJobs}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-warning" />
              </div>
              <div className="flex items-center mt-2 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>This week</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-gradient-card backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="h-5 w-5 mr-2 text-primary" />
                Quick Job Search
              </CardTitle>
              <CardDescription>
                Find your next opportunity from curated job listings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">Frontend Engineer</p>
                    <p className="text-sm text-muted-foreground">Nova Labs • Remote</p>
                  </div>
                  <Badge variant="secondary">New</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">Backend Engineer</p>
                    <p className="text-sm text-muted-foreground">Orbit Inc. • Austin, TX</p>
                  </div>
                  <Badge variant="outline">$130K+</Badge>
                </div>
              </div>
              <Button className="w-full" asChild>
                <Link to="/jobs">
                  View All Jobs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-secondary" />
                Profile Completeness
              </CardTitle>
              <CardDescription>
                Complete your profile to increase your visibility
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Profile completion</span>
                  <span className="font-medium">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 mr-2 text-success" />
                  <span>Resume uploaded</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 mr-2 text-success" />
                  <span>Skills added</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2 text-warning" />
                  <span>Portfolio projects needed</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full" asChild>
                <Link to="/resume">
                  Complete Profile
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-card backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/resume">
              <CardContent className="p-6 text-center">
                <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Build Resume</h3>
                <p className="text-sm text-muted-foreground">
                  Create ATS-optimized resumes with professional templates
                </p>
              </CardContent>
            </Link>
          </Card>

          <Card className="bg-gradient-card backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/gap-analyzer">
              <CardContent className="p-6 text-center">
                <BarChart3 className="h-12 w-12 text-secondary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Gap Analyzer</h3>
                <p className="text-sm text-muted-foreground">
                  Analyze how well your resume matches job requirements
                </p>
              </CardContent>
            </Link>
          </Card>

          <Card className="bg-gradient-card backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/resources">
              <CardContent className="p-6 text-center">
                <BookOpen className="h-12 w-12 text-success mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Learning Hub</h3>
                <p className="text-sm text-muted-foreground">
                  Access guides, tutorials, and career development resources
                </p>
              </CardContent>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;