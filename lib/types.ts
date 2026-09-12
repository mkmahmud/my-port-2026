export type ProjectType = 'project' | 'case-study';

export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  techStack: string[];
  category: string[];
  thumbnailUrl: string;
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;

  // Case Study & Extended Attributes
  projectType?: ProjectType;
  projectFor?: string;
  projectTitle?: string;
  projectKeyWord?: string;
  overview?: string[] | string;
  features?: string[];
  challenges?: string[];
  solutions?: string[];
  developersRole?: string;
  technologies?: string[];
  Technologies?: string[];
  duration?: string;
  Duration?: string;
  result?: string;
  Result?: string;
  gellaryImages?: string[];
  projectCategory?: string[];
  liveSite?: string;
  projectID?: number | string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactSubmission extends ContactFormData {
  _id: string;
  createdAt: string;
  read: boolean;
}

export interface NavLink {
  label: string;
  href: string;
  sectionId: string;
}

export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  command: string;
  skills: Skill[];
}

export interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | 'Present';
  achievements: string[];
  techStack?: string[];
}

export interface EducationEntry {
  institution: string;
  degree: string;
  field?: string;
  startDate: string;
  endDate: string;
}

export interface SiteConfig {
  name: string;
  role: string;
  tagline: string;
  description: string;
  location: string;
  email: string;
  phone?: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  available: boolean;
  availabilityText: string;
}
