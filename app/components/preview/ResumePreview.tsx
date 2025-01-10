"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  PersonalInfo,
  ProfessionalSummary,
  WorkExperience,
  Education,
} from "@/app/schemas/resume";
import { loadFromLocalStorage } from "@/lib/localStorage";

export function ResumePreview() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [professionalSummary, setProfessionalSummary] =
    useState<ProfessionalSummary | null>(null);
  const [workExperience, setWorkExperience] = useState<WorkExperience | null>(
    null
  );
  const [education, setEducation] = useState<Education | null>(null);

  useEffect(() => {
    // Initial load
    const data = loadFromLocalStorage();
    if (data.personalInfo) {
      setPersonalInfo(data.personalInfo);
    }
    if (data.professionalSummary) {
      setProfessionalSummary(data.professionalSummary);
    }
    if (data.workExperience) {
      setWorkExperience(data.workExperience);
    }
    if (data.education) {
      setEducation(data.education);
    }

    // Setup storage event listener
    const handleStorageChange = () => {
      const data = loadFromLocalStorage();
      if (data.personalInfo) {
        setPersonalInfo(data.personalInfo);
      }
      if (data.professionalSummary) {
        setProfessionalSummary(data.professionalSummary);
      }
      if (data.workExperience) {
        setWorkExperience(data.workExperience);
      }
      if (data.education) {
        setEducation(data.education);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (!personalInfo) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Resume Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Start filling out your information to see the preview.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Resume Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Personal Information */}
          <div>
            <h2 className="text-2xl font-bold">
              {personalInfo.firstName} {personalInfo.lastName}
            </h2>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>{personalInfo.email}</p>
              <p>{personalInfo.phone}</p>
              <p>{personalInfo.location}</p>
            </div>
          </div>

          {/* Professional Summary */}
          {professionalSummary && professionalSummary.summary && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Professional Summary
                </h3>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {professionalSummary.summary}
                </p>
              </div>
            </>
          )}

          {/* Work Experience */}
          {workExperience && workExperience.experiences.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-4">Work Experience</h3>
                <div className="space-y-4">
                  {workExperience.experiences.map((experience) => (
                    <div key={experience.id} className="space-y-2">
                      <div>
                        <h4 className="font-medium">{experience.position}</h4>
                        <p className="text-sm text-muted-foreground">
                          {experience.company} • {experience.location}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {experience.current
                            ? `${experience.startDate} - Present`
                            : `${experience.startDate} - ${experience.endDate}`}
                        </p>
                      </div>
                      <p className="text-sm">{experience.description}</p>
                      {experience.highlights.length > 0 && (
                        <ul className="text-sm list-disc list-inside space-y-1">
                          {experience.highlights.map((highlight, index) => (
                            <li key={index}>{highlight}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Education */}
          {education && education.education.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-4">Education</h3>
                <div className="space-y-4">
                  {education.education.map((edu) => (
                    <div key={edu.id} className="space-y-2">
                      <div>
                        <h4 className="font-medium">{edu.school}</h4>
                        <p className="text-sm text-muted-foreground">
                          {edu.degree} in {edu.field}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {edu.location} •{" "}
                          {edu.current
                            ? `${edu.startDate} - Present`
                            : `${edu.startDate} - ${edu.endDate}`}
                          {edu.gpa && ` • GPA: ${edu.gpa}`}
                        </p>
                      </div>
                      {edu.description && (
                        <p className="text-sm">{edu.description}</p>
                      )}
                      {edu.achievements.length > 0 && (
                        <ul className="text-sm list-disc list-inside space-y-1">
                          {edu.achievements.map((achievement, index) => (
                            <li key={index}>{achievement}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
