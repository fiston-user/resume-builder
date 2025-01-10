import * as z from "zod";

export const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  location: z.string().min(1, "Location is required"),
});

export const professionalSummarySchema = z.object({
  summary: z
    .string()
    .min(50, "Professional summary should be at least 50 characters")
    .max(500, "Professional summary should not exceed 500 characters"),
});

export const workExperienceItemSchema = z.object({
  id: z.string(),
  company: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Position is required"),
  location: z.string().min(1, "Location is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z
    .string()
    .min(30, "Description should be at least 30 characters")
    .max(1000, "Description should not exceed 1000 characters"),
  highlights: z.array(z.string()).default([]),
});

export const workExperienceSchema = z.object({
  experiences: z.array(workExperienceItemSchema).default([]),
});

export const educationItemSchema = z.object({
  id: z.string(),
  school: z.string().min(1, "School name is required"),
  degree: z.string().min(1, "Degree is required"),
  field: z.string().min(1, "Field of study is required"),
  location: z.string().min(1, "Location is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z
    .string()
    .max(500, "Description should not exceed 500 characters")
    .optional(),
  achievements: z.array(z.string()).default([]),
  gpa: z
    .string()
    .regex(/^\d*\.?\d*$/, "GPA must be a valid number")
    .optional(),
});

export const educationSchema = z.object({
  education: z.array(educationItemSchema).default([]),
});

export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type ProfessionalSummary = z.infer<typeof professionalSummarySchema>;
export type WorkExperienceItem = z.infer<typeof workExperienceItemSchema>;
export type WorkExperience = z.infer<typeof workExperienceSchema>;
export type EducationItem = z.infer<typeof educationItemSchema>;
export type Education = z.infer<typeof educationSchema>;

export interface ResumeData {
  personalInfo: PersonalInfo;
  professionalSummary?: ProfessionalSummary;
  workExperience?: WorkExperience;
  education?: Education;
  lastSaved?: Date;
}
