import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockResources, Resource } from '@/lib/mockData';
import { 
  Search, 
  Filter, 
  Clock, 
  Star,
  BookOpen,
  FileText,
  MessageCircle,
  Folder,
  Code,
  TrendingUp,
  ExternalLink,
  CheckCircle,
  Play
} from 'lucide-react';

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

  // Filter resources based on search and filters
  const filteredResources = mockResources.filter(resource => {
    const matchesSearch = searchTerm === '' || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'all' || resource.category === categoryFilter;
    const matchesLevel = levelFilter === 'all' || resource.level === levelFilter;
    const matchesTab = activeTab === 'all' || resource.category === activeTab;
    
    return matchesSearch && matchesCategory && matchesLevel && matchesTab;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Resume': return <FileText className="h-4 w-4" />;
      case 'Interview': return <MessageCircle className="h-4 w-4" />;
      case 'Portfolio': return <Folder className="h-4 w-4" />;
      case 'ATS': return <Search className="h-4 w-4" />;
      case 'Frontend': return <Code className="h-4 w-4" />;
      case 'Backend': return <Code className="h-4 w-4" />;
      case 'Data Science': return <TrendingUp className="h-4 w-4" />;
      case 'Career': return <Star className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Resume', label: 'Resume Writing' },
    { value: 'Interview', label: 'Interview Prep' },
    { value: 'Portfolio', label: 'Portfolio Tips' },
    { value: 'ATS', label: 'ATS Optimization' },
    { value: 'Frontend', label: 'Frontend Dev' },
    { value: 'Backend', label: 'Backend Dev' },
    { value: 'Data Science', label: 'Data Science' },
    { value: 'Career', label: 'Career Strategy' }
  ];

  const featuredResources = mockResources.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-success/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Learning Resources</h1>
          <p className="text-muted-foreground">
            Curated guides, tutorials, and tools to accelerate your career growth
          </p>
        </div>

        {/* Featured Resources */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Featured Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredResources.map((resource) => (
              <Card key={resource.id} className="bg-gradient-card backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    {getCategoryIcon(resource.category)}
                    <Badge variant="secondary" className={getLevelColor(resource.level)}>
                      {resource.level}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {resource.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {resource.estimatedTime}
                    </div>
                    <Button size="sm">
                      <Play className="h-3 w-3 mr-1" />
                      Start
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 bg-card/80 backdrop-blur-sm border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search resources, topics, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Categorized Resources */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="Resume">Resume</TabsTrigger>
            <TabsTrigger value="Interview">Interview</TabsTrigger>
            <TabsTrigger value="Portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="Frontend">Frontend</TabsTrigger>
            <TabsTrigger value="Backend">Backend</TabsTrigger>
            <TabsTrigger value="Data Science">Data</TabsTrigger>
            <TabsTrigger value="Career">Career</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {filteredResources.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredResources.map((resource) => (
                  <Card key={resource.id} className="bg-card/80 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-all duration-200">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          {getCategoryIcon(resource.category)}
                          <Badge variant="outline" className="text-xs">
                            {resource.category}
                          </Badge>
                        </div>
                        <Badge variant="secondary" className={`text-xs ${getLevelColor(resource.level)}`}>
                          {resource.level}
                        </Badge>
                      </div>
                      
                      <h3 className="font-semibold text-lg mb-2">{resource.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {resource.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {resource.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{resource.estimatedTime}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Star className="h-4 w-4" />
                          </Button>
                          <Button size="sm">
                            {resource.url ? (
                              <>
                                <ExternalLink className="h-3 w-3 mr-1" />
                                View
                              </>
                            ) : (
                              <>
                                <Play className="h-3 w-3 mr-1" />
                                Start
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-md">
                <CardContent className="p-12 text-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No resources found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria or explore different categories.
                  </p>
                  <Button onClick={() => {
                    setSearchTerm('');
                    setCategoryFilter('all');
                    setLevelFilter('all');
                    setActiveTab('all');
                  }}>
                    Clear filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Learning Path Suggestion */}
        <Card className="mt-8 bg-gradient-primary text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg mb-2">Personalized Learning Path</h3>
                <p className="text-primary-foreground/90 mb-4">
                  Based on your gap analysis, we recommend starting with these resources to improve your job match scores.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-primary-foreground text-primary">
                    ATS Optimization
                  </Badge>
                  <Badge variant="secondary" className="bg-primary-foreground text-primary">
                    React Best Practices
                  </Badge>
                  <Badge variant="secondary" className="bg-primary-foreground text-primary">
                    Portfolio Projects
                  </Badge>
                </div>
              </div>
              <Button variant="secondary" asChild>
                <a href="/gap-analyzer">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Analysis
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Resources;