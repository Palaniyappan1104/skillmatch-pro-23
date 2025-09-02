import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  FileText, 
  BarChart3, 
  Users, 
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp
} from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-brand">
              <span className="text-primary-foreground font-bold text-2xl">S</span>
            </div>
          </div>
          
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              SkillMatch+
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            The intelligent job platform that matches your skills with perfect opportunities. 
            Build ATS-optimized resumes, track applications, and analyze your fit with AI-powered insights.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-primary hover:opacity-90" asChild>
              <Link to="/signup">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="bg-gradient-card backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <Search className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Smart Job Search</h3>
              <p className="text-muted-foreground">
                Find opportunities that match your skills with advanced filtering and AI recommendations.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <FileText className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Resume Builder</h3>
              <p className="text-muted-foreground">
                Create ATS-friendly resumes with professional templates and optimization tips.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <BarChart3 className="h-12 w-12 text-success mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Gap Analyzer</h3>
              <p className="text-muted-foreground">
                Get percentage match scores and actionable recommendations to improve your applications.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-primary rounded-2xl p-8 text-primary-foreground text-center">
          <h2 className="text-2xl font-bold mb-8">Join Thousands of Successful Job Seekers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">15K+</div>
              <div className="text-primary-foreground/90">Jobs Posted</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">8K+</div>
              <div className="text-primary-foreground/90">Successful Matches</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-primary-foreground/90">User Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
