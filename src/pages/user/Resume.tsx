import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/lib/supabaseAuth';
import jsPDF from 'jspdf';
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
  Code,
  Trash2
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ResumeData {
  header: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    portfolio: string;
  };
  summary: string;
  experience: {
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }[];
  education: {
    id: string;
    degree: string;
    school: string;
    location: string;
    graduationDate: string;
    gpa: string;
  }[];
  skills: string[];
  projects: {
    id: string;
    name: string;
    description: string;
    technologies: string[];
    url: string;
  }[];
  certifications: {
    id: string;
    name: string;
    issuer: string;
    date: string;
    url: string;
  }[];
}

const initialResumeData: ResumeData = {
  header: {
    name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    portfolio: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
};

const Resume = () => {
  const [editableResumeData, setEditableResumeData] = useState<ResumeData>({
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

  const [generateFormData, setGenerateFormData] = useState<ResumeData>(initialResumeData);

  const [activeTab, setActiveTab] = useState('edit');
  const [uploadedResume, setUploadedResume] = useState<File | null>(null);
  const [myResumes, setMyResumes] = useState<{ name: string; type: 'uploaded' | 'generated' | 'edited'; content: string | File; id: string; }[]>([]);
  const [activeResumeId, setActiveResumeId] = useState<string | null>(null);

  const { toast } = useToast();

  // Functions for editableResumeData
  const updateField = (section: keyof ResumeData, field: string, value: any) => {
    setEditableResumeData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [field]: value
      }
    }));
  };

  const addArrayItem = (section: 'experience' | 'education' | 'projects' | 'certifications', newItem: any) => {
    setEditableResumeData(prev => ({
      ...prev,
      [section]: [...(prev[section] as any[]), { ...newItem, id: Date.now().toString() }]
    }));
  };

  const removeArrayItem = (section: 'experience' | 'education' | 'projects' | 'certifications', id: string) => {
    setEditableResumeData(prev => ({
      ...prev,
      [section]: (prev[section] as any[]).filter((item: any) => item.id !== id)
    }));
  };

  const updateArrayItem = (section: 'experience' | 'education' | 'projects' | 'certifications', id: string, field: string, value: any) => {
    setEditableResumeData(prev => ({
      ...prev,
      [section]: (prev[section] as any[]).map((item: any) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  // Functions for generateFormData
  const updateGenerateFormField = (section: keyof ResumeData, field: string, value: any) => {
    setGenerateFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [field]: value
      }
    }));
  };

  const addGenerateFormArrayItem = (section: 'experience' | 'education' | 'projects' | 'certifications', newItem: any) => {
    setGenerateFormData(prev => ({
      ...prev,
      [section]: [...(prev[section] as any[]), { ...newItem, id: Date.now().toString() }]
    }));
  };

  const removeGenerateFormArrayItem = (section: 'experience' | 'education' | 'projects' | 'certifications', id: string) => {
    setGenerateFormData(prev => ({
      ...prev,
      [section]: (prev[section] as any[]).filter((item: any) => item.id !== id)
    }));
  };

  const updateGenerateFormArrayItem = (section: 'experience' | 'education' | 'projects' | 'certifications', id: string, field: string, value: any) => {
    setGenerateFormData(prev => ({
      ...prev,
      [section]: (prev[section] as any[]).map((item: any) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setUploadedResume(event.target.files[0]);
    }
  };

  const handleSaveUploadedResume = () => {
    if (uploadedResume) {
      const newResume = { name: uploadedResume.name, type: 'uploaded' as const, content: uploadedResume, id: `uploaded-${Date.now()}` }; // Keep content as File for uploaded resumes
      setMyResumes(prev => [...prev, newResume]);
      setActiveResumeId(newResume.id);
      setUploadedResume(null);
      toast({
        title: "Resume Uploaded and Set as Final!",
        description: `${newResume.name} is now your active resume.`,
      });
      // In a real application, you would send this file to your backend/DB
      console.log("Saving uploaded resume:", uploadedResume.name);
    }
  };

  const handleGenerateResume = () => {
    // Ensure minimal data is present before generating
    if (!generateFormData.header.name || !generateFormData.summary) {
      toast({
        title: "Cannot Generate Resume",
        description: "Please fill out at least your Name and Professional Summary.",
        variant: "destructive",
      });
      return;
    }

    // Update the editableResumeData with the generated data
    setEditableResumeData(generateFormData);

    // Generate PDF and add to myResumes
    const doc = new jsPDF();
    let yPos = 10;
    doc.setFontSize(18);
    doc.text(generateFormData.header.name, 10, yPos);
    yPos += 7;
    doc.setFontSize(10);
    doc.text(`${generateFormData.header.email} | ${generateFormData.header.phone} | ${generateFormData.header.location}`, 10, yPos);
    yPos += 10;
    if (generateFormData.summary) {
      doc.setFontSize(12);
      doc.text("Professional Summary", 10, yPos);
      yPos += 5;
      doc.setFontSize(10);
      doc.text(doc.splitTextToSize(generateFormData.summary, 180), 10, yPos);
      yPos += doc.splitTextToSize(generateFormData.summary, 180).length * 5 + 5;
    }

    if (generateFormData.experience.length > 0) {
      doc.setFontSize(12);
      doc.text("Work Experience", 10, yPos);
      yPos += 5;
      generateFormData.experience.forEach(exp => {
        doc.setFontSize(10);
        doc.text(`${exp.title} at ${exp.company}`, 10, yPos);
        yPos += 5;
        doc.text(`${exp.location} | ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`, 10, yPos);
        yPos += 5;
        doc.text(doc.splitTextToSize(exp.description, 180), 10, yPos);
        yPos += doc.splitTextToSize(exp.description, 180).length * 5 + 5;
      });
    }

    if (generateFormData.skills.length > 0) {
      doc.setFontSize(12);
      doc.text("Skills", 10, yPos);
      yPos += 5;
      doc.setFontSize(10);
      doc.text(generateFormData.skills.join(', '), 10, yPos);
      yPos += 5;
    }

    const pdfOutput = doc.output('blob');
    const generatedResumeId = `generated-${Date.now()}`;
    const generatedPdfFile = new File([pdfOutput], `Generated_Resume_${new Date().toISOString().slice(0, 10)}.pdf`, { type: 'application/pdf' });
    setMyResumes(prev => [...prev, { id: generatedResumeId, name: generatedPdfFile.name, type: 'generated' as const, content: generatedPdfFile }]);
    setActiveResumeId(generatedResumeId);
    setGenerateFormData(initialResumeData); // Reset generate form data
    setActiveTab('edit'); // Switch to edit tab
    toast({
      title: "Resume Generated and Set as Final!",
      description: "Your new resume is ready for editing and set as active.",
    });
  };

  const handleDownloadResume = (content: ResumeData | File, name: string) => {
    if (content instanceof File) {
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = content.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else if (typeof content === 'object') { // Assuming ResumeData is an object
      const doc = new jsPDF();
      let yPos = 10;
      doc.setFontSize(18);
      doc.text(content.header.name, 10, yPos);
      yPos += 7;
      doc.setFontSize(10);
      doc.text(`${content.header.email} | ${content.header.phone} | ${content.header.location}`, 10, yPos);
      yPos += 10;
      if (content.summary) {
        doc.setFontSize(12);
        doc.text("Professional Summary", 10, yPos);
        yPos += 5;
        doc.setFontSize(10);
        doc.text(doc.splitTextToSize(content.summary, 180), 10, yPos);
        yPos += doc.splitTextToSize(content.summary, 180).length * 5 + 5;
      }

      if (content.experience.length > 0) {
        doc.setFontSize(12);
        doc.text("Work Experience", 10, yPos);
        yPos += 5;
        content.experience.forEach(exp => {
          doc.setFontSize(10);
          doc.text(`${exp.title} at ${exp.company}`, 10, yPos);
          yPos += 5;
          doc.text(`${exp.location} | ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`, 10, yPos);
          yPos += 5;
          doc.text(doc.splitTextToSize(exp.description, 180), 10, yPos);
          yPos += doc.splitTextToSize(exp.description, 180).length * 5 + 5;
        });
      }

      if (content.skills.length > 0) {
        doc.setFontSize(12);
        doc.text("Skills", 10, yPos);
        yPos += 5;
        doc.setFontSize(10);
        doc.text(content.skills.join(', '), 10, yPos);
        yPos += 5;
      }
      doc.save(`${name}`);
    }
  };

  const handleSaveEditedResume = () => {
    // Create a unique ID for the resume or find existing
    const existingResumeIndex = myResumes.findIndex(
      (res) => res.type === 'edited' && (res.content as ResumeData).header.name === editableResumeData.header.name // A simplistic check for 'same' resume
    );

    const resumeToSave = {
      name: `Edited_Resume_${editableResumeData.header.name || 'Unnamed'}_${new Date().toISOString().slice(0, 10)}.pdf`,
      type: 'edited' as const,
      content: editableResumeData, // Store the ResumeData object
      id: `edited-${Date.now()}`,
    };

    setMyResumes(prev => {
      let newResumes;
      if (existingResumeIndex > -1) {
        newResumes = [...prev];
        newResumes[existingResumeIndex] = { ...resumeToSave, id: prev[existingResumeIndex].id }; // Retain original ID
      } else {
        newResumes = [...prev, resumeToSave];
      }
      return newResumes;
    });
    setActiveResumeId(resumeToSave.id);
    toast({
      title: "Resume Saved and Set as Final!",
      description: `${resumeToSave.name} is now your active resume.`,
    });
  };

  const handleDeleteResume = (id: string) => {
    if (window.confirm("Are you sure you want to delete this resume?")) {
      setMyResumes(prev => prev.filter(resume => resume.id !== id));
      if (activeResumeId === id) {
        setActiveResumeId(null);
        toast({
          title: "Active Resume Deleted",
          description: "The active resume has been deleted. Please select a new one.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Resume Deleted",
          description: "The selected resume has been removed.",
        });
      }
    }
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
            <Button variant="outline" onClick={() => setActiveTab('edit')}> {/* Assuming 'Import' means switching to edit view to start with a blank slate or existing data */}
              <FileText className="h-4 w-4 mr-2" />
              Edit Current Resume
            </Button>
            <Button variant="outline" onClick={() => setActiveTab('preview')}> {/* Assuming 'Preview' means switching to preview view */}
              <Eye className="h-4 w-4 mr-2" />
              Preview Resume
            </Button>
            <Button onClick={() => handleDownloadResume(editableResumeData, `Edited_Resume_${editableResumeData.header.name || 'Unnamed'}_${new Date().toISOString().slice(0, 10)}.pdf`)}>
              <Download className="h-4 w-4 mr-2" />
              Download Current PDF
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="upload">My Resumes</TabsTrigger>
            <TabsTrigger value="generate">Generate New Resume</TabsTrigger>
            <TabsTrigger value="edit">Edit Current Resume</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          {/* My Resumes Tab (formerly Upload) */}
          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><Upload className="h-5 w-5 mr-2" /> Upload New Resume</CardTitle>
                <CardDescription>Upload your existing resume (PDF or TXT) to save it to your profile.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input type="file" accept=".pdf,.txt" onChange={handleFileUpload} />
                <Button onClick={handleSaveUploadedResume} disabled={!uploadedResume}><Save className="h-4 w-4 mr-2" /> Upload & Set as Final</Button>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold mb-2">My Saved Resumes</h3>
                  {myResumes.length > 0 ? (
                    <div className="space-y-2">
                      {myResumes.map((resume) => (
                        <div 
                          key={resume.id} 
                          className={`flex items-center justify-between p-3 border rounded-md 
                          ${resume.id === activeResumeId ? 'bg-primary/10 border-primary shadow-sm' : 'bg-muted/50'}`}
                        >
                          <span className="text-sm font-medium flex-1 mr-2">
                            {resume.name} ({resume.type})
                            {resume.id === activeResumeId && <Badge variant="default" className="ml-2">Final</Badge>}
                          </span>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => {
                              if (resume.type === 'uploaded') {
                                setActiveResumeId(resume.id);
                                toast({
                                  title: "Active Resume Set!",
                                  description: `${resume.name} is now your active resume.`,
                                });
                              } else if (resume.type === 'generated' || resume.type === 'edited') {
                                setEditableResumeData(resume.content as ResumeData);
                                setActiveResumeId(resume.id);
                                setActiveTab('edit');
                                toast({
                                  title: "Resume Loaded for Editing and Set as Final!",
                                  description: `${resume.name} is now your active resume.`,
                                });
                              }
                            }}>
                              <FileText className="h-4 w-4 mr-2" /> Set as Final
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDownloadResume(resume.content, resume.name)}>
                              <Download className="h-4 w-4 mr-2" /> Download
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteResume(resume.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-muted-foreground text-sm">
                      No resumes saved yet. Upload one or generate a new one!
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Generate Resume Tab */}
          <TabsContent value="generate" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
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
                        <Label htmlFor="generate-name">Full Name</Label>
                        <Input
                          id="generate-name"
                          value={generateFormData.header.name}
                          onChange={(e) => updateGenerateFormField('header', 'name', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="generate-email">Email</Label>
                        <Input
                          id="generate-email"
                          type="email"
                          value={generateFormData.header.email}
                          onChange={(e) => updateGenerateFormField('header', 'email', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="generate-phone">Phone</Label>
                        <Input
                          id="generate-phone"
                          value={generateFormData.header.phone}
                          onChange={(e) => updateGenerateFormField('header', 'phone', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="generate-location">Location</Label>
                        <Input
                          id="generate-location"
                          value={generateFormData.header.location}
                          onChange={(e) => updateGenerateFormField('header', 'location', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="generate-linkedin">LinkedIn</Label>
                        <Input
                          id="generate-linkedin"
                          value={generateFormData.header.linkedin}
                          onChange={(e) => updateGenerateFormField('header', 'linkedin', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="generate-portfolio">Portfolio</Label>
                        <Input
                          id="generate-portfolio"
                          value={generateFormData.header.portfolio}
                          onChange={(e) => updateGenerateFormField('header', 'portfolio', e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

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
                      value={generateFormData.summary}
                      onChange={(e) => setGenerateFormData(prev => ({ ...prev, summary: e.target.value }))}
                      rows={4}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <Briefcase className="h-5 w-5 mr-2" />
                        Work Experience
                      </CardTitle>
                      <Button
                        size="sm"
                        onClick={() => addGenerateFormArrayItem('experience', {
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
                    {generateFormData.experience.map((exp, index) => (
                      <div key={exp.id} className="border border-border rounded-lg p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Experience #{index + 1}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeGenerateFormArrayItem('experience', exp.id)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Job Title</Label>
                            <Input
                              value={exp.title}
                              onChange={(e) => updateGenerateFormArrayItem('experience', exp.id, 'title', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>Company</Label>
                            <Input
                              value={exp.company}
                              onChange={(e) => updateGenerateFormArrayItem('experience', exp.id, 'company', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>Location</Label>
                            <Input
                              value={exp.location}
                              onChange={(e) => updateGenerateFormArrayItem('experience', exp.id, 'location', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>Start Date</Label>
                            <Input
                              type="month"
                              value={exp.startDate}
                              onChange={(e) => updateGenerateFormArrayItem('experience', exp.id, 'startDate', e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            rows={4}
                            value={exp.description}
                            onChange={(e) => updateGenerateFormArrayItem('experience', exp.id, 'description', e.target.value)}
                            placeholder="• Led development of key features..."
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Code className="h-5 w-5 mr-2" />
                      Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {generateFormData.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {skill}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 hover:bg-transparent"
                            onClick={() => {
                              const newSkills = generateFormData.skills.filter((_, i) => i !== index);
                              setGenerateFormData(prev => ({ ...prev, skills: newSkills }));
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
                              setGenerateFormData(prev => ({
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

                <div className="flex justify-center mt-6">
                  <Button size="lg" onClick={handleGenerateResume}><Plus className="h-4 w-4 mr-2" /> Generate Resume</Button>
                </div>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Resume Generation Tips</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                      <p className="text-sm">Fill out all sections for a comprehensive resume.</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                      <p className="text-sm">Use keywords relevant to your target jobs.</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                      <p className="text-sm">Review the generated content carefully before downloading.</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Templates</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      Professional Template
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Modern Template
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Creative Template
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

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
                          value={editableResumeData.header.name}
                          onChange={(e) => updateField('header', 'name', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={editableResumeData.header.email}
                          onChange={(e) => updateField('header', 'email', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={editableResumeData.header.phone}
                          onChange={(e) => updateField('header', 'phone', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={editableResumeData.header.location}
                          onChange={(e) => updateField('header', 'location', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                          id="linkedin"
                          value={editableResumeData.header.linkedin}
                          onChange={(e) => updateField('header', 'linkedin', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="portfolio">Portfolio</Label>
                        <Input
                          id="portfolio"
                          value={editableResumeData.header.portfolio}
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
                      value={editableResumeData.summary}
                      onChange={(e) => setEditableResumeData(prev => ({ ...prev, summary: e.target.value }))}
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
                    {editableResumeData.experience.map((exp, index) => (
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

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Code className="h-5 w-5 mr-2" />
                      Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {editableResumeData.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {skill}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 hover:bg-transparent"
                            onClick={() => {
                              const newSkills = editableResumeData.skills.filter((_, i) => i !== index);
                              setEditableResumeData(prev => ({ ...prev, skills: newSkills }));
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
                              setEditableResumeData(prev => ({
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
                    <h1 className="text-2xl font-bold">{editableResumeData.header.name}</h1>
                    <div className="flex justify-center space-x-4 text-muted-foreground">
                      <span>{editableResumeData.header.email}</span>
                      <span>•</span>
                      <span>{editableResumeData.header.phone}</span>
                      <span>•</span>
                      <span>{editableResumeData.header.location}</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Summary */}
                  {editableResumeData.summary && (
                    <div>
                      <h2 className="text-lg font-semibold mb-2">PROFESSIONAL SUMMARY</h2>
                      <p className="text-muted-foreground">{editableResumeData.summary}</p>
                    </div>
                  )}

                  {/* Experience */}
                  {editableResumeData.experience.length > 0 && (
                    <div>
                      <h2 className="text-lg font-semibold mb-4">WORK EXPERIENCE</h2>
                      <div className="space-y-4">
                        {editableResumeData.experience.map((exp) => (
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
                  {editableResumeData.skills.length > 0 && (
                    <div>
                      <h2 className="text-lg font-semibold mb-2">SKILLS</h2>
                      <p className="text-muted-foreground">
                        {editableResumeData.skills.join(' • ')}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Button (moved inside TabsContent if it relates to 'edit' or 'generate' */}
        <div className="flex justify-center mt-8">
          <Button size="lg" className="bg-gradient-primary hover:opacity-90" onClick={handleSaveEditedResume}>
            <Save className="h-4 w-4 mr-2" />
            Save Final Resume
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Resume;