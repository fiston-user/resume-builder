"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  PersonalInfo,
  ProfessionalSummary,
  WorkExperience,
  Education,
  Skills,
  Projects,
} from "@/app/schemas/resume";
import { loadFromLocalStorage } from "@/lib/localStorage";
import { useTemplate } from "@/context/TemplateContext";
import { getTemplateStyles } from "../template/styles";
import { cn } from "@/lib/utils";

export function ResumePreview() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [professionalSummary, setProfessionalSummary] =
    useState<ProfessionalSummary | null>(null);
  const [workExperience, setWorkExperience] = useState<WorkExperience | null>(
    null
  );
  const [education, setEducation] = useState<Education | null>(null);
  const [skills, setSkills] = useState<Skills | null>(null);
  const [projects, setProjects] = useState<Projects | null>(null);
  const { template, colorScheme } = useTemplate();
  const styles = getTemplateStyles(template, colorScheme);

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
    if (data.skills) {
      setSkills(data.skills);
    }
    if (data.projects) {
      setProjects(data.projects);
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
      if (data.skills) {
        setSkills(data.skills);
      }
      if (data.projects) {
        setProjects(data.projects);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-blue-500";
      case "Intermediate":
        return "bg-green-500";
      case "Advanced":
        return "bg-purple-500";
      case "Expert":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleDownload = async () => {
    if (!targetRef.current) return;

    try {
      const content = targetRef.current;

      // Add PDF-specific styles before capturing
      content.style.background = "white";
      content.style.width = "210mm"; // A4 width
      content.style.padding = "15mm"; // Margins
      content.style.position = "relative";

      const canvas = await html2canvas(content, {
        scale: 2, // Higher resolution
        useCORS: true,
        backgroundColor: "#ffffff",
        windowWidth: content.scrollWidth,
        windowHeight: content.scrollHeight,
      });

      // Reset styles
      content.style.width = "";
      content.style.padding = "";
      content.style.position = "";

      const imgData = canvas.toDataURL("image/png", 1.0);

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // First page
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      // Add new pages if content overflows
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save(
        `${personalInfo?.firstName}_${personalInfo?.lastName}_Resume.pdf`
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

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

  // Group skills by category
  const groupedSkills =
    skills?.skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {} as Record<string, typeof skills.skills>) || {};

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Resume Preview</CardTitle>
        {personalInfo && (
          <Button onClick={handleDownload} size="sm" variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div
          ref={targetRef}
          className={styles.container}
          style={{
            background: "white",
            color: "black",
          }}
        >
          {/* Personal Information */}
          <div>
            <h2 className={styles.header.title}>
              {personalInfo.firstName} {personalInfo.lastName}
            </h2>
            <div className={styles.header.subtitle}>
              <p>{personalInfo.email}</p>
              <p>{personalInfo.phone}</p>
              <p>{personalInfo.location}</p>
            </div>
          </div>

          {/* Professional Summary */}
          {professionalSummary && professionalSummary.summary && (
            <>
              <Separator />
              <div className={styles.section.container}>
                <h3 className={styles.section.title}>Professional Summary</h3>
                <p className={styles.text.muted}>
                  {professionalSummary.summary}
                </p>
              </div>
            </>
          )}

          {/* Skills */}
          {skills && skills.skills.length > 0 && (
            <>
              <Separator />
              <div className={styles.section.container}>
                <h3 className={styles.section.title}>Skills</h3>
                <div className="space-y-3">
                  {Object.entries(groupedSkills).map(([category, skills]) => (
                    <div key={category}>
                      <h4 className="font-medium text-sm mb-1">{category}</h4>
                      <p className={styles.text.muted}>
                        {skills
                          .map((skill) => `${skill.name} (${skill.level})`)
                          .join(" • ")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Work Experience */}
          {workExperience && workExperience.experiences.length > 0 && (
            <>
              <Separator />
              <div className={styles.section.container}>
                <h3 className={styles.section.title}>Work Experience</h3>
                <div className={styles.section.content}>
                  {workExperience.experiences.map((experience) => (
                    <div key={experience.id} className="space-y-2">
                      <div>
                        <h4 className="font-medium">{experience.position}</h4>
                        <p className={styles.text.muted}>
                          {experience.company} • {experience.location}
                        </p>
                        <p className={styles.text.muted}>
                          {experience.current
                            ? `${experience.startDate} - Present`
                            : `${experience.startDate} - ${experience.endDate}`}
                        </p>
                      </div>
                      <p className={styles.text.normal}>
                        {experience.description}
                      </p>
                      {experience.highlights.length > 0 && (
                        <ul
                          className={cn(
                            styles.text.normal,
                            "list-disc list-inside space-y-1"
                          )}
                        >
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
              <div className={styles.section.container}>
                <h3 className={styles.section.title}>Education</h3>
                <div className={styles.section.content}>
                  {education.education.map((edu) => (
                    <div key={edu.id} className="space-y-2">
                      <div>
                        <h4 className="font-medium">{edu.school}</h4>
                        <p className={styles.text.muted}>
                          {edu.degree} in {edu.field}
                        </p>
                        <p className={styles.text.muted}>
                          {edu.location} •{" "}
                          {edu.current
                            ? `${edu.startDate} - Present`
                            : `${edu.startDate} - ${edu.endDate}`}
                          {edu.gpa && ` • GPA: ${edu.gpa}`}
                        </p>
                      </div>
                      {edu.description && (
                        <p className={styles.text.normal}>{edu.description}</p>
                      )}
                      {edu.achievements.length > 0 && (
                        <ul
                          className={cn(
                            styles.text.normal,
                            "list-disc list-inside space-y-1"
                          )}
                        >
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

          {/* Projects */}
          {projects && projects.projects.length > 0 && (
            <>
              <Separator />
              <div className={styles.section.container}>
                <h3 className={styles.section.title}>Projects</h3>
                <div className={styles.section.content}>
                  {projects.projects.map((project) => (
                    <div key={project.id} className="space-y-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{project.name}</h4>
                          {project.url && (
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={cn(
                                styles.text.muted,
                                "hover:text-primary"
                              )}
                            >
                              View Project ↗
                            </a>
                          )}
                        </div>
                        <p className={styles.text.muted}>
                          {project.role} •{" "}
                          {project.current
                            ? `${project.startDate} - Present`
                            : `${project.startDate} - ${project.endDate}`}
                        </p>
                      </div>
                      <p className={styles.text.normal}>
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className={cn(
                              styles.text.normal,
                              "px-2 py-1 bg-gray-100 rounded"
                            )}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      {project.highlights.length > 0 && (
                        <ul
                          className={cn(
                            styles.text.normal,
                            "list-disc list-inside space-y-1"
                          )}
                        >
                          {project.highlights.map((highlight, index) => (
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
        </div>
      </CardContent>
    </Card>
  );
}
