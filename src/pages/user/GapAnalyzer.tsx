import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { mockJobs, mockApplications, calculateGapAnalysis, Resume, Job } from '@/lib/mockData';
import { 
  BarChart3, 
  Target, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp,
  FileText,
  Search,
  Lightbulb,
  ArrowRight,
  Download,
  RefreshCw
} from 'lucide-react';

const GapAnalyzer = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [customJobDescription, setCustomJobDescription] = useState('');
  const [inputMode, setInputMode] = useState<'select' | 'custom'>('select');
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mock resume data (in real app, this would come from user's saved resume)
  const mockResume: Resume = {
    id: 'resume-1',
    userId: 'user-1',
    name: 'Alex Chen Resume',
    sections: {
      header: {
        name: 'Alex Chen',
        email: 'alex.chen@email.com',
        phone: '(555) 123-4567',
        location: 'San Francisco, CA'
      },
      summary: 'Experienced frontend developer with 4+ years building scalable web applications',
      experience: [
        {
          id: '1',
          title: 'Senior Frontend Developer',
          company: 'TechCorp Inc.',
          location: 'San Francisco, CA',
          startDate: '2022-03',
          endDate: '',
          current: true,
          description: 'Led development of user-facing features for 50K+ daily active users'
        }
      ],
      education: [
        {
          id: '1',
          degree: 'BS Computer Science',
          school: 'Stanford University',
          location: 'Stanford, CA',
          graduationDate: '2020-05'
        }
      ],
      skills: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Git', 'Node.js'],
      projects: [],
      certifications: []
    },
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  };

  const runAnalysis = async () => {
    if (!selectedJob && !customJobDescription) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    let jobToAnalyze: Job;
    
    if (inputMode === 'select' && selectedJob) {
      jobToAnalyze = selectedJob;
    } else {
      // Create mock job from custom description
      jobToAnalyze = {
        id: 'custom',
        title: 'Custom Position',
        company: 'Target Company',
        location: 'Remote',
        type: 'Full-time',
        remote: true,
        skills: extractSkillsFromDescription(customJobDescription),
        postedAt: new Date().toISOString(),
        description: customJobDescription,
        requirements: [],
        experience: 'Mid',
        department: 'Engineering'
      };
    }
    
    const result = calculateGapAnalysis(mockResume, jobToAnalyze);
    setAnalysisResult({
      ...result,
      job: jobToAnalyze,
      resume: mockResume
    });
    
    setIsAnalyzing(false);
  };

  const extractSkillsFromDescription = (description: string): string[] => {
    const commonSkills = [
      'React', 'Vue', 'Angular', 'JavaScript', 'TypeScript', 'HTML', 'CSS',
      'Node.js', 'Python', 'Java', 'C++', 'SQL', 'MongoDB', 'PostgreSQL',
      'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Git', 'Jenkins'
    ];
    
    return commonSkills.filter(skill => 
      description.toLowerCase().includes(skill.toLowerCase())
    );
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMatchLabel = (percentage: number) => {
    if (percentage >= 80) return 'Excellent Match';
    if (percentage >= 60) return 'Good Match';
    if (percentage >= 40) return 'Fair Match';
    return 'Needs Improvement';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Gap Analyzer</h1>
          <p className="text-muted-foreground">
            Analyze how well your resume matches job requirements and get actionable improvements
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-primary" />
                  Job Requirements
                </CardTitle>
                <CardDescription>
                  Select a job from your applications or paste a job description
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Button
                    variant={inputMode === 'select' ? 'default' : 'outline'}
                    onClick={() => setInputMode('select')}
                  >
                    Select from Jobs
                  </Button>
                  <Button
                    variant={inputMode === 'custom' ? 'default' : 'outline'}
                    onClick={() => setInputMode('custom')}
                  >
                    Paste Description
                  </Button>
                </div>

                {inputMode === 'select' ? (
                  <div>
                    <Label>Choose a job to analyze against</Label>
                    <Select onValueChange={(value) => {
                      const job = mockJobs.find(j => j.id === value);
                      setSelectedJob(job || null);
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a job..." />
                      </SelectTrigger>
                      <SelectContent>
                        {mockJobs.map((job) => (
                          <SelectItem key={job.id} value={job.id}>
                            {job.title} at {job.company}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <div>
                    <Label>Job Description</Label>
                    <Textarea
                      placeholder="Paste the job description here..."
                      value={customJobDescription}
                      onChange={(e) => setCustomJobDescription(e.target.value)}
                      rows={8}
                      className="mt-2"
                    />
                  </div>
                )}

                <Button 
                  onClick={runAnalysis}
                  disabled={isAnalyzing || (!selectedJob && !customJobDescription)}
                  className="w-full bg-gradient-primary hover:opacity-90"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing Match...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Analyze Match
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Analysis Results */}
            {analysisResult && (
              <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-secondary" />
                    Analysis Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Match Score */}
                  <div className="text-center p-6 bg-gradient-card rounded-lg">
                    <div className={`text-4xl font-bold mb-2 ${getMatchColor(analysisResult.matchPercentage)}`}>
                      {analysisResult.matchPercentage}%
                    </div>
                    <div className="text-lg font-medium mb-2">
                      {getMatchLabel(analysisResult.matchPercentage)}
                    </div>
                    <Progress 
                      value={analysisResult.matchPercentage} 
                      className="w-full h-2"
                    />
                  </div>

                  {/* Matching Skills */}
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                      Matching Skills ({analysisResult.matchingSkills.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.matchingSkills.map((skill: string) => (
                        <Badge key={skill} variant="secondary" className="bg-green-100 text-green-800">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Missing Skills */}
                  {analysisResult.missingSkills.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2 text-red-600" />
                        Missing Skills ({analysisResult.missingSkills.length})
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.missingSkills.map((skill: string) => (
                          <Badge key={skill} variant="secondary" className="bg-red-100 text-red-800">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <Separator />

                  {/* Recommendations */}
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center">
                      <Lightbulb className="h-4 w-4 mr-2 text-yellow-600" />
                      Recommendations
                    </h3>
                    <div className="space-y-3">
                      {analysisResult.recommendations.map((rec: string, index: number) => (
                        <div key={index} className="flex items-start space-x-2 p-3 bg-muted/50 rounded-lg">
                          <ArrowRight className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                          <p className="text-sm">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button className="flex-1" asChild>
                      <a href="/resume">
                        <FileText className="h-4 w-4 mr-2" />
                        Update Resume
                      </a>
                    </Button>
                    {analysisResult.matchPercentage >= 60 && (
                      <Button variant="outline" className="flex-1">
                        Apply to Job
                      </Button>
                    )}
                    <Button variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Export Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-md">
              <CardHeader>
                <CardTitle>Your Resume</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Current Skills</h4>
                    <div className="flex flex-wrap gap-1">
                      {mockResume.sections.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Experience</h4>
                    <p className="text-sm text-muted-foreground">
                      {mockResume.sections.experience[0]?.title} at{' '}
                      {mockResume.sections.experience[0]?.company}
                    </p>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href="/resume">
                      <FileText className="h-4 w-4 mr-2" />
                      Edit Resume
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-md">
              <CardHeader>
                <CardTitle>Analysis Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-sm">Higher match percentages increase your chances of getting interviews</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                  <p className="text-sm">Focus on adding the most critical missing skills first</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                  <p className="text-sm">Use exact keywords from the job description in your resume</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GapAnalyzer;