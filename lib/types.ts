export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
}

export interface ProfessionalSummary {
  summary: string;
}

export interface WorkExperienceItem {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  highlights: string[];
}

export interface WorkExperience {
  experiences: WorkExperienceItem[];
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
  achievements: string[];
  gpa?: string;
}

export interface Education {
  education: EducationItem[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  professionalSummary?: ProfessionalSummary;
  workExperience?: WorkExperience;
  education?: Education;
  lastSaved?: Date;
}
