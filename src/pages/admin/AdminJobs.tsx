import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { mockJobs, mockApplications } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  Save, 
  Eye, 
  Edit, 
  Trash2, 
  Copy,
  FileText,
  MapPin,
  Building,
  DollarSign,
  Users,
  Clock
} from 'lucide-react';

const AdminJobs = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('create');
  const [jobForm, setJobForm] = useState({
    title: '',
    company: 'SkillMatch+ Company',
    location: '',
    type: 'Full-time',
    remote: false,
    department: '',
    experience: 'Mid',
    salary: { min: '', max: '' },
    description: '',
    requirements: [''],
    skills: [''],
    benefits: ['']
  });

  const updateJobForm = (field: string, value: any) => {
    setJobForm(prev => ({ ...prev, [field]: value }));
  };

  const updateArrayField = (field: string, index: number, value: string) => {
    setJobForm(prev => ({
      ...prev,
      [field]: (prev as any)[field].map((item: string, i: number) => 
        i === index ? value : item
      )
    }));
  };

  const addArrayField = (field: string) => {
    setJobForm(prev => ({
      ...prev,
      [field]: [...(prev as any)[field], '']
    }));
  };

  const removeArrayField = (field: string, index: number) => {
    setJobForm(prev => ({
      ...prev,
      [field]: (prev as any)[field].filter((_: any, i: number) => i !== index)
    }));
  };

  const handleSaveJob = async (isDraft = false) => {
    // Validate form
    if (!jobForm.title || !jobForm.location || !jobForm.description) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: isDraft ? "Draft Saved" : "Job Published",
      description: isDraft ? "Your job draft has been saved." : "Your job posting is now live!",
    });

    if (!isDraft) {
      // Reset form after publishing
      setJobForm({
        title: '',
        company: 'SkillMatch+ Company',
        location: '',
        type: 'Full-time',
        remote: false,
        department: '',
        experience: 'Mid',
        salary: { min: '', max: '' },
        description: '',
        requirements: [''],
        skills: [''],
        benefits: ['']
      });
    }
  };

  const getJobStats = (jobId: string) => {
    const applications = mockApplications.filter(app => app.jobId === jobId);
    return {
      total: applications.length,
      new: applications.filter(app => app.status === 'Applied').length,
      interview: applications.filter(app => app.status === 'Interview').length,
      offers: applications.filter(app => app.status === 'Offer').length
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Job Management</h1>
          <p className="text-muted-foreground">
            Create, manage, and track your job postings
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">Create Job</TabsTrigger>
            <TabsTrigger value="manage">Manage Jobs</TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Job Form */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Job Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title">Job Title *</Label>
                        <Input
                          id="title"
                          value={jobForm.title}
                          onChange={(e) => updateJobForm('title', e.target.value)}
                          placeholder="e.g. Senior Frontend Developer"
                        />
                      </div>
                      <div>
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          value={jobForm.company}
                          onChange={(e) => updateJobForm('company', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location *</Label>
                        <Input
                          id="location"
                          value={jobForm.location}
                          onChange={(e) => updateJobForm('location', e.target.value)}
                          placeholder="e.g. San Francisco, CA"
                        />
                      </div>
                      <div>
                        <Label htmlFor="department">Department</Label>
                        <Input
                          id="department"
                          value={jobForm.department}
                          onChange={(e) => updateJobForm('department', e.target.value)}
                          placeholder="e.g. Engineering"
                        />
                      </div>
                      <div>
                        <Label htmlFor="type">Job Type</Label>
                        <Select onValueChange={(value) => updateJobForm('type', value)} defaultValue="Full-time">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Full-time">Full-time</SelectItem>
                            <SelectItem value="Part-time">Part-time</SelectItem>
                            <SelectItem value="Contract">Contract</SelectItem>
                            <SelectItem value="Internship">Internship</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="experience">Experience Level</Label>
                        <Select onValueChange={(value) => updateJobForm('experience', value)} defaultValue="Mid">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Entry">Entry Level</SelectItem>
                            <SelectItem value="Mid">Mid Level</SelectItem>
                            <SelectItem value="Senior">Senior Level</SelectItem>
                            <SelectItem value="Lead">Lead Level</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remote"
                        checked={jobForm.remote}
                        onCheckedChange={(checked) => updateJobForm('remote', checked)}
                      />
                      <label htmlFor="remote" className="text-sm font-medium">
                        Remote work available
                      </label>
                    </div>

                    <div>
                      <Label>Salary Range (Optional)</Label>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div>
                          <Input
                            placeholder="Min salary"
                            value={jobForm.salary.min}
                            onChange={(e) => updateJobForm('salary', { ...jobForm.salary, min: e.target.value })}
                            type="number"
                          />
                        </div>
                        <div>
                          <Input
                            placeholder="Max salary"
                            value={jobForm.salary.max}
                            onChange={(e) => updateJobForm('salary', { ...jobForm.salary, max: e.target.value })}
                            type="number"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">Job Description *</Label>
                      <Textarea
                        id="description"
                        value={jobForm.description}
                        onChange={(e) => updateJobForm('description', e.target.value)}
                        placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                        rows={6}
                      />
                    </div>

                    {/* Requirements */}
                    <div>
                      <Label>Requirements</Label>
                      <div className="space-y-2 mt-2">
                        {jobForm.requirements.map((req, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={req}
                              onChange={(e) => updateArrayField('requirements', index, e.target.value)}
                              placeholder="e.g. 3+ years of React experience"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeArrayField('requirements', index)}
                              disabled={jobForm.requirements.length === 1}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addArrayField('requirements')}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Requirement
                        </Button>
                      </div>
                    </div>

                    {/* Skills */}
                    <div>
                      <Label>Required Skills</Label>
                      <div className="space-y-2 mt-2">
                        {jobForm.skills.map((skill, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={skill}
                              onChange={(e) => updateArrayField('skills', index, e.target.value)}
                              placeholder="e.g. React, TypeScript, Node.js"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeArrayField('skills', index)}
                              disabled={jobForm.skills.length === 1}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addArrayField('skills')}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Skill
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Publishing</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button
                      onClick={() => handleSaveJob(false)}
                      className="w-full bg-gradient-primary hover:opacity-90"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Publish Job
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleSaveJob(true)}
                      className="w-full"
                    >
                      Save as Draft
                    </Button>
                    <Button variant="ghost" className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Tips for Better Results</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <p className="text-sm">Use clear, descriptive job titles</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                      <p className="text-sm">Include salary range to attract more candidates</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                      <p className="text-sm">List specific skills and technologies</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                      <p className="text-sm">Highlight company culture and benefits</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="manage" className="space-y-6">
            <div className="grid gap-6">
              <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Posted Jobs</CardTitle>
                      <CardDescription>
                        Manage your active job postings and view application statistics
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockJobs.map((job) => {
                      const stats = getJobStats(job.id);
                      return (
                        <div key={job.id} className="border border-border rounded-lg p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold">{job.title}</h3>
                              <div className="flex items-center text-muted-foreground text-sm mt-1">
                                <Building className="h-4 w-4 mr-1" />
                                <span>{job.company}</span>
                                <span className="mx-2">•</span>
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{job.location}</span>
                                <span className="mx-2">•</span>
                                <Clock className="h-4 w-4 mr-1" />
                                <span>Posted {new Date(job.postedAt).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center mt-2 space-x-2">
                                <Badge variant="outline">{job.type}</Badge>
                                <Badge variant="secondary">{job.experience}</Badge>
                                {job.remote && <Badge variant="outline">Remote</Badge>}
                                {job.salary && (
                                  <Badge variant="outline">
                                    <DollarSign className="h-3 w-3 mr-1" />
                                    ${job.salary.min/1000}K - ${job.salary.max/1000}K
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2 ml-4">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-4 gap-4 pt-4 border-t border-border">
                            <div className="text-center">
                              <div className="text-lg font-semibold">{stats.total}</div>
                              <div className="text-xs text-muted-foreground">Total Applications</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-semibold text-blue-600">{stats.new}</div>
                              <div className="text-xs text-muted-foreground">New</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-semibold text-yellow-600">{stats.interview}</div>
                              <div className="text-xs text-muted-foreground">Interviews</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-semibold text-green-600">{stats.offers}</div>
                              <div className="text-xs text-muted-foreground">Offers</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminJobs;