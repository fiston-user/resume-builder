import { PersonalInformation } from "./components/forms/PersonalInformation";
import { ProfessionalSummary } from "./components/forms/ProfessionalSummary";
import { WorkExperience } from "./components/forms/WorkExperience";
import { Education } from "./components/forms/Education";
import { Skills } from "./components/forms/Skills";
import { Projects } from "./components/forms/Projects";
import { ResumePreview } from "./components/preview/ResumePreview";
import { TemplateSelector } from "./components/template/TemplateSelector";
import { TemplateProvider } from "@/context/TemplateContext";

export default function Home() {
  return (
    <TemplateProvider>
      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <TemplateSelector />
            <PersonalInformation />
            <ProfessionalSummary />
            <WorkExperience />
            <Education />
            <Skills />
            <Projects />
          </div>

          <div className="sticky top-8">
            <ResumePreview />
          </div>
        </div>
      </main>
    </TemplateProvider>
  );
}
