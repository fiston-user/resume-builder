import { PersonalInformation } from "./components/forms/PersonalInformation";
import { ProfessionalSummary } from "./components/forms/ProfessionalSummary";
import { WorkExperience } from "./components/forms/WorkExperience";
import { Education } from "./components/forms/Education";
import { ResumePreview } from "./components/preview/ResumePreview";

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <PersonalInformation />
          <ProfessionalSummary />
          <WorkExperience />
          <Education />
        </div>

        <div className="sticky top-8">
          <ResumePreview />
        </div>
      </div>
    </main>
  );
}
