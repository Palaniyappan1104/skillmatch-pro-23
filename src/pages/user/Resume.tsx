import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Download, 
  Eye, 
  Plus, 
  Minus, 
  Save,
  Upload,
  Star,
  Briefcase,
  GraduationCap,
  Award,
  Code
} from 'lucide-react';

const Resume = () => {
  const [resumeData, setResumeData] = useState({
    header: {
      name: 'Alex Chen',
      email: 'alex.chen@email.com',
      phone: '(555) 123-4567',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/alexchen',
      portfolio: 'alexchen.dev'
    },
    summary: 'Experienced frontend developer with 4+ years building scalable web applications using React, TypeScript, and modern web technologies. Passionate about creating exceptional user experiences and writing clean, maintainable code.',
    experience: [
      {
        id: '1',
        title: 'Senior Frontend Developer',
        company: 'TechCorp Inc.',
        location: 'San Francisco, CA',
        startDate: '2022-03',
        endDate: '',
        current: true,
        description: '• Led development of user-facing features for 50K+ daily active users\n• Improved application performance by 40% through code optimization and lazy loading\n• Mentored 3 junior developers and established frontend best practices'
      },
      {
        id: '2',
        title: 'Frontend Developer',
        company: 'StartupXYZ',
        location: 'Remote',
        startDate: '2020-06',
        endDate: '2022-02',
        current: false,
        description: '• Built responsive web applications using React, Redux, and TypeScript\n• Collaborated with design team to implement pixel-perfect UI components\n• Reduced bundle size by 30% through webpack optimization'
      }
    ],
    education: [
      {
        id: '1',
        degree: 'Bachelor of Science in Computer Science',
        school: 'Stanford University',
        location: 'Stanford, CA',
        graduationDate: '2020-05',
        gpa: '3.8'
      }
    ],
    skills: ['React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'AWS', 'Docker', 'Git'],
    projects: [
      {
        id: '1',
        name: 'E-commerce Platform',
        description: 'Full-stack e-commerce solution with React frontend and Node.js backend',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        url: 'github.com/alexchen/ecommerce'
      }
    ],
    certifications: [
      {
        id: '1',
        name: 'AWS Certified Developer Associate',
        issuer: 'Amazon Web Services',
        date: '2023-08',
        url: 'aws.amazon.com/certification'
      }
    ]
  });

  const [activeTab, setActiveTab] = useState('edit');

  const updateField = (section: string, field: string, value: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: {
        ...(prev as any)[section],
        [field]: value
      }
    }));
  };

  const addArrayItem = (section: string, newItem: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...(prev as any)[section], { ...newItem, id: Date.now().toString() }]
    }));
  };

  const removeArrayItem = (section: string, id: string) => {
    setResumeData(prev => ({
      ...prev,
      [section]: (prev as any)[section].filter((item: any) => item.id !== id)
    }));
  };

  const updateArrayItem = (section: string, id: string, field: string, value: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: (prev as any)[section].map((item: any) => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Resume Builder</h1>
            <p className="text-muted-foreground">
              Create ATS-friendly resumes with professional templates
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="edit">Edit Resume</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Editor */}
              <div className="lg:col-span-2 space-y-6">
                {/* Header Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={resumeData.header.name}
                          onChange={(e) => updateField('header', 'name', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={resumeData.header.email}
                          onChange={(e) => updateField('header', 'email', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={resumeData.header.phone}
                          onChange={(e) => updateField('header', 'phone', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={resumeData.header.location}
                          onChange={(e) => updateField('header', 'location', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                          id="linkedin"
                          value={resumeData.header.linkedin}
                          onChange={(e) => updateField('header', 'linkedin', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="portfolio">Portfolio</Label>
                        <Input
                          id="portfolio"
                          value={resumeData.header.portfolio}
                          onChange={(e) => updateField('header', 'portfolio', e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Summary Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Star className="h-5 w-5 mr-2" />
                      Professional Summary
                    </CardTitle>
                    <CardDescription>
                      Write a compelling 2-3 sentence summary highlighting your key strengths
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Experienced professional with..."
                      value={resumeData.summary}
                      onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                      rows={4}
                    />
                  </CardContent>
                </Card>

                {/* Experience Section */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <Briefcase className="h-5 w-5 mr-2" />
                        Work Experience
                      </CardTitle>
                      <Button
                        size="sm"
                        onClick={() => addArrayItem('experience', {
                          title: '',
                          company: '',
                          location: '',
                          startDate: '',
                          endDate: '',
                          current: false,
                          description: ''
                        })}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Experience
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {resumeData.experience.map((exp, index) => (
                      <div key={exp.id} className="border border-border rounded-lg p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Experience #{index + 1}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeArrayItem('experience', exp.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Job Title</Label>
                            <Input
                              value={exp.title}
                              onChange={(e) => updateArrayItem('experience', exp.id, 'title', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>Company</Label>
                            <Input
                              value={exp.company}
                              onChange={(e) => updateArrayItem('experience', exp.id, 'company', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>Location</Label>
                            <Input
                              value={exp.location}
                              onChange={(e) => updateArrayItem('experience', exp.id, 'location', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>Start Date</Label>
                            <Input
                              type="month"
                              value={exp.startDate}
                              onChange={(e) => updateArrayItem('experience', exp.id, 'startDate', e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            rows={4}
                            value={exp.description}
                            onChange={(e) => updateArrayItem('experience', exp.id, 'description', e.target.value)}
                            placeholder="• Led development of key features..."
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Skills Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Code className="h-5 w-5 mr-2" />
                      Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resumeData.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {skill}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 hover:bg-transparent"
                            onClick={() => {
                              const newSkills = resumeData.skills.filter((_, i) => i !== index);
                              setResumeData(prev => ({ ...prev, skills: newSkills }));
                            }}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a skill..."
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            const input = e.target as HTMLInputElement;
                            if (input.value.trim()) {
                              setResumeData(prev => ({
                                ...prev,
                                skills: [...prev.skills, input.value.trim()]
                              }));
                              input.value = '';
                            }
                          }
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>ATS Tips</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                      <p className="text-sm">Use keywords from the job description</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                      <p className="text-sm">Include quantifiable achievements</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                      <p className="text-sm">Keep formatting simple and clean</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                      <p className="text-sm">Use action verbs to start bullet points</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Templates</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      Professional
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Modern
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Creative
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            <Card className="max-w-4xl mx-auto">
              <CardContent className="p-8">
                {/* Resume Preview */}
                <div className="space-y-6 font-mono text-sm">
                  {/* Header */}
                  <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold">{resumeData.header.name}</h1>
                    <div className="flex justify-center space-x-4 text-muted-foreground">
                      <span>{resumeData.header.email}</span>
                      <span>•</span>
                      <span>{resumeData.header.phone}</span>
                      <span>•</span>
                      <span>{resumeData.header.location}</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Summary */}
                  {resumeData.summary && (
                    <div>
                      <h2 className="text-lg font-semibold mb-2">PROFESSIONAL SUMMARY</h2>
                      <p className="text-muted-foreground">{resumeData.summary}</p>
                    </div>
                  )}

                  {/* Experience */}
                  {resumeData.experience.length > 0 && (
                    <div>
                      <h2 className="text-lg font-semibold mb-4">WORK EXPERIENCE</h2>
                      <div className="space-y-4">
                        {resumeData.experience.map((exp) => (
                          <div key={exp.id}>
                            <div className="flex justify-between items-start mb-1">
                              <h3 className="font-semibold">{exp.title}</h3>
                              <span className="text-muted-foreground">
                                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                              </span>
                            </div>
                            <p className="text-muted-foreground mb-2">
                              {exp.company} • {exp.location}
                            </p>
                            <div className="whitespace-pre-line text-muted-foreground">
                              {exp.description}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Skills */}
                  {resumeData.skills.length > 0 && (
                    <div>
                      <h2 className="text-lg font-semibold mb-2">SKILLS</h2>
                      <p className="text-muted-foreground">
                        {resumeData.skills.join(' • ')}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="flex justify-center mt-8">
          <Button size="lg" className="bg-gradient-primary hover:opacity-90">
            <Save className="h-4 w-4 mr-2" />
            Save Resume
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Resume;