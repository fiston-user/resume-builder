"use client";

import { PersonalInformation } from "./components/forms/PersonalInformation";
import { ProfessionalSummary } from "./components/forms/ProfessionalSummary";
import { WorkExperience } from "./components/forms/WorkExperience";
import { Education } from "./components/forms/Education";
import { Skills } from "./components/forms/Skills";
import { Projects } from "./components/forms/Projects";
import { ResumePreview } from "./components/preview/ResumePreview";
import { TemplateSelector } from "./components/template/TemplateSelector";
import { SectionOrder } from "./components/template/SectionOrder";
import { TemplateProvider } from "@/context/TemplateContext";
import {
  SectionOrderProvider,
  useSectionOrder,
} from "@/context/SectionOrderContext";

function FormSections() {
  const { sections, isSectionVisible } = useSectionOrder();

  const sectionComponents = {
    summary: <ProfessionalSummary />,
    skills: <Skills />,
    experience: <WorkExperience />,
    education: <Education />,
    projects: <Projects />,
  };

  return (
    <div className="space-y-6">
      <TemplateSelector />
      <SectionOrder />
      <PersonalInformation />
      {sections.map((section) =>
        isSectionVisible(section.id) ? (
          <div key={section.id}>{sectionComponents[section.id]}</div>
        ) : null
      )}
    </div>
  );
}

export default function Home() {
  return (
    <TemplateProvider>
      <SectionOrderProvider>
        <main className="container mx-auto py-8 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormSections />
            <div className="sticky top-8">
              <ResumePreview />
            </div>
          </div>
        </main>
      </SectionOrderProvider>
    </TemplateProvider>
  );
}
