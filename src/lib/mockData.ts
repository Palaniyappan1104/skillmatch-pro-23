// Mock data for SkillMatch+ - Phase 1 implementation
// This will be replaced with real database queries in Phase 2

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  remote: boolean;
  salary?: { min: number; max: number };
  skills: string[];
  postedAt: string;
  description: string;
  requirements: string[];
  experience: 'Entry' | 'Mid' | 'Senior' | 'Lead';
  department: string;
}

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  appliedAt: string;
  status: 'Applied' | 'Interview' | 'Rejected' | 'Offer' | 'Withdrawn';
  notes?: string;
  resumeVersionId?: string;
}

export interface Resume {
  id: string;
  userId: string;
  name: string;
  sections: {
    header: {
      name: string;
      email: string;
      phone: string;
      location: string;
      linkedin?: string;
      portfolio?: string;
    };
    summary: string;
    experience: Array<{
      id: string;
      title: string;
      company: string;
      location: string;
      startDate: string;
      endDate?: string;
      current: boolean;
      description: string;
    }>;
    education: Array<{
      id: string;
      degree: string;
      school: string;
      location: string;
      graduationDate: string;
      gpa?: string;
    }>;
    skills: string[];
    projects: Array<{
      id: string;
      name: string;
      description: string;
      technologies: string[];
      url?: string;
    }>;
    certifications: Array<{
      id: string;
      name: string;
      issuer: string;
      date: string;
      url?: string;
    }>;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'Resume' | 'Interview' | 'Portfolio' | 'ATS' | 'Data Science' | 'Frontend' | 'Backend' | 'Career';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  tags: string[];
  url?: string;
  content?: string;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Alex Chen',
    email: 'alex.chen@email.com',
    role: 'user',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'admin-1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@skillmatch.com',
    role: 'admin',
    createdAt: '2024-01-01T09:00:00Z'
  }
];

// Mock Jobs
export const mockJobs: Job[] = [
  {
    id: 'job-1',
    title: 'Frontend Engineer',
    company: 'Nova Labs',
    location: 'San Francisco, CA',
    type: 'Full-time',
    remote: true,
    salary: { min: 120000, max: 160000 },
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'GraphQL'],
    postedAt: '2025-08-15T10:00:00Z',
    description: 'Join our team to build cutting-edge user interfaces for our AI-powered platform. You will work with modern web technologies and contribute to products used by millions of users.',
    requirements: [
      '3+ years of React development experience',
      'Strong TypeScript skills',
      'Experience with modern CSS frameworks',
      'Knowledge of state management (Redux, Zustand, etc.)',
      'Familiarity with testing frameworks (Jest, Cypress)'
    ],
    experience: 'Mid',
    department: 'Engineering'
  },
  {
    id: 'job-2',
    title: 'Backend Engineer',
    company: 'Orbit Inc.',
    location: 'Austin, TX',
    type: 'Full-time',
    remote: false,
    salary: { min: 130000, max: 180000 },
    skills: ['Node.js', 'Python', 'PostgreSQL', 'AWS', 'Docker'],
    postedAt: '2025-08-10T14:30:00Z',
    description: 'Build scalable backend systems and APIs that power our distributed platform. Work with microservices, cloud infrastructure, and help shape our technical architecture.',
    requirements: [
      '4+ years of backend development experience',
      'Proficiency in Node.js or Python',
      'Experience with relational databases',
      'Knowledge of cloud platforms (AWS, GCP, or Azure)',
      'Understanding of microservices architecture'
    ],
    experience: 'Mid',
    department: 'Engineering'
  },
  {
    id: 'job-3',
    title: 'Data Analyst',
    company: 'InsightIO',
    location: 'Remote',
    type: 'Full-time',
    remote: true,
    salary: { min: 85000, max: 115000 },
    skills: ['SQL', 'Python', 'Tableau', 'Excel', 'Statistics'],
    postedAt: '2025-08-05T09:15:00Z',
    description: 'Analyze complex datasets to drive business insights and support strategic decision-making. Work with cross-functional teams to identify trends and opportunities.',
    requirements: [
      '2+ years of data analysis experience',
      'Advanced SQL skills',
      'Proficiency in Python or R',
      'Experience with data visualization tools',
      'Strong statistical analysis background'
    ],
    experience: 'Entry',
    department: 'Analytics'
  },
  {
    id: 'job-4',
    title: 'Fullstack Developer',
    company: 'Crafted',
    location: 'New York, NY',
    type: 'Full-time',
    remote: true,
    salary: { min: 110000, max: 150000 },
    skills: ['React', 'Node.js', 'MongoDB', 'JavaScript', 'REST APIs'],
    postedAt: '2025-07-28T11:45:00Z',
    description: 'Join our agile team to build end-to-end web applications. You will work on both frontend and backend development, contributing to our creative project management platform.',
    requirements: [
      '3+ years of fullstack development experience',
      'Proficiency in modern JavaScript frameworks',
      'Experience with both SQL and NoSQL databases',
      'Knowledge of RESTful API design',
      'Familiarity with version control (Git)'
    ],
    experience: 'Mid',
    department: 'Product'
  },
  {
    id: 'job-5',
    title: 'DevOps Engineer',
    company: 'CloudNest',
    location: 'Seattle, WA',
    type: 'Full-time',
    remote: true,
    salary: { min: 140000, max: 175000 },
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
    postedAt: '2025-08-20T08:00:00Z',
    description: 'Design, implement, and manage our cloud infrastructure and CI/CD pipelines. Ensure high availability, scalability, and security of our services.',
    requirements: [
      '5+ years of DevOps experience',
      'Strong expertise in AWS',
      'Hands-on experience with Docker and Kubernetes',
      'Proficiency in infrastructure as code (Terraform, CloudFormation)',
      'Experience with CI/CD tools (Jenkins, GitLab CI, GitHub Actions)'
    ],
    experience: 'Senior',
    department: 'Infrastructure'
  }
];

// Mock Applications
export const mockApplications: Application[] = [
  {
    id: 'app-1',
    jobId: 'job-1',
    userId: 'user-1',
    appliedAt: '2025-08-10T10:00:00Z',
    status: 'Interview',
    notes: 'Technical interview scheduled for next week'
  },
  {
    id: 'app-2',
    jobId: 'job-2',
    userId: 'user-1',
    appliedAt: '2025-08-02T15:30:00Z',
    status: 'Applied',
    notes: 'Waiting for initial response'
  },
  {
    id: 'app-3',
    jobId: 'job-3',
    userId: 'user-1',
    appliedAt: '2025-07-28T09:15:00Z',
    status: 'Rejected',
    notes: 'Not enough experience with statistical modeling'
  },
  {
    id: 'app-4',
    jobId: 'job-4',
    userId: 'user-1',
    appliedAt: '2025-07-20T14:20:00Z',
    status: 'Offer',
    notes: 'Received offer - considering terms'
  },
  {
    id: 'app-5',
    jobId: 'job-5',
    userId: 'user-1',
    appliedAt: '2025-08-22T11:00:00Z',
    status: 'Applied',
    notes: 'Followed up with recruiter after application.'
  }
];

// Mock Resources
export const mockResources: Resource[] = [
  {
    id: 'res-1',
    title: 'ATS-Friendly Resume Guide',
    description: 'Learn how to optimize your resume for Applicant Tracking Systems with proven formatting tips and keyword strategies.',
    category: 'Resume',
    level: 'Beginner',
    estimatedTime: '30 minutes',
    tags: ['ATS', 'Resume Format', 'Keywords']
  },
  {
    id: 'res-2',
    title: 'Technical Interview Preparation',
    description: 'Comprehensive guide covering coding challenges, system design, and behavioral questions for tech interviews.',
    category: 'Interview',
    level: 'Intermediate',
    estimatedTime: '2 hours',
    tags: ['Coding', 'System Design', 'Behavioral']
  },
  {
    id: 'res-3',
    title: 'Building a Portfolio Website',
    description: 'Step-by-step tutorial for creating a professional portfolio that showcases your projects and skills effectively.',
    category: 'Portfolio',
    level: 'Intermediate',
    estimatedTime: '4 hours',
    tags: ['Portfolio', 'Web Development', 'Projects']
  },
  {
    id: 'res-4',
    title: 'React Advanced Patterns',
    description: 'Master advanced React concepts including custom hooks, context patterns, and performance optimization techniques.',
    category: 'Frontend',
    level: 'Advanced',
    estimatedTime: '3 hours',
    tags: ['React', 'Hooks', 'Performance']
  },
  {
    id: 'res-5',
    title: 'Data Science Career Roadmap',
    description: 'Complete guide to building a career in data science, from learning paths to landing your first job.',
    category: 'Career',
    level: 'Beginner',
    estimatedTime: '45 minutes',
    tags: ['Data Science', 'Career Path', 'Skills']
  }
];

// Helper functions for mock data operations
export const getJobById = (id: string): Job | undefined => {
  return mockJobs.find(job => job.id === id);
};

export const getApplicationsByUserId = (userId: string): Application[] => {
  return mockApplications.filter(app => app.userId === userId);
};

export const getJobsByFilters = (filters: {
  query?: string;
  location?: string;
  type?: string;
  remote?: boolean;
  experience?: string;
}): Job[] => {
  return mockJobs.filter(job => {
    if (filters.query && !job.title.toLowerCase().includes(filters.query.toLowerCase()) &&
        !job.company.toLowerCase().includes(filters.query.toLowerCase()) &&
        !job.skills.some(skill => skill.toLowerCase().includes(filters.query!.toLowerCase()))) {
      return false;
    }
    if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    if (filters.type && job.type !== filters.type) {
      return false;
    }
    if (filters.remote !== undefined && job.remote !== filters.remote) {
      return false;
    }
    if (filters.experience && job.experience !== filters.experience) {
      return false;
    }
    return true;
  });
};

export const calculateGapAnalysis = (resume: Resume, job: Job) => {
  const resumeSkills = resume.sections.skills.map(skill => skill.toLowerCase());
  const jobSkills = job.skills.map(skill => skill.toLowerCase());
  
  const matchingSkills = jobSkills.filter(skill => 
    resumeSkills.some(resumeSkill => 
      resumeSkill.includes(skill) || skill.includes(resumeSkill)
    )
  );
  
  const missingSkills = jobSkills.filter(skill => 
    !resumeSkills.some(resumeSkill => 
      resumeSkill.includes(skill) || skill.includes(resumeSkill)
    )
  );
  
  const matchPercentage = Math.round((matchingSkills.length / jobSkills.length) * 100);
  
  return {
    matchPercentage,
    matchingSkills: matchingSkills,
    missingSkills: missingSkills,
    recommendations: [
      `Add ${missingSkills.slice(0, 3).join(', ')} to your skills section`,
      `Consider taking courses in ${missingSkills.slice(0, 2).join(' and ')}`,
      `Update your experience descriptions to highlight ${matchingSkills[0]} projects`,
      'Quantify your achievements with specific metrics and results'
    ].filter(rec => rec.length > 20) // Filter out empty recommendations
  };
};