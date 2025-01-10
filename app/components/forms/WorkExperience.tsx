"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  workExperienceSchema,
  type WorkExperience,
  type WorkExperienceItem,
} from "@/app/schemas/resume";
import { loadFromLocalStorage } from "@/lib/localStorage";
import { useAutoSave } from "@/hooks/useAutoSave";
import { useAutoSaveContext } from "@/context/AutoSaveContext";
import { WorkExperienceItem as ExperienceCard } from "./WorkExperienceItem";
import { WorkExperienceDialog } from "./WorkExperienceDialog";

export function WorkExperience() {
  const { isAutoSaveEnabled } = useAutoSaveContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExperience, setEditingExperience] =
    useState<WorkExperienceItem | null>(null);

  const { watch, setValue } = useForm<WorkExperience>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: loadFromLocalStorage().workExperience || { experiences: [] },
  });

  const experiences = watch("experiences");
  useAutoSave({ experiences }, "workExperience", isAutoSaveEnabled);

  const handleAdd = () => {
    setEditingExperience(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (experience: WorkExperienceItem) => {
    setEditingExperience(experience);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setValue(
      "experiences",
      experiences.filter((exp) => exp.id !== id),
      { shouldDirty: true }
    );
  };

  const handleSave = (experience: WorkExperienceItem) => {
    if (editingExperience) {
      // Edit existing experience
      setValue(
        "experiences",
        experiences.map((exp) => (exp.id === experience.id ? experience : exp)),
        { shouldDirty: true }
      );
    } else {
      // Add new experience
      setValue("experiences", [...experiences, experience], {
        shouldDirty: true,
      });
    }
    setIsDialogOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Work Experience</CardTitle>
          <Button onClick={handleAdd} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Experience
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {experiences.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No work experience added yet. Click the button above to add your
              first experience.
            </p>
          ) : (
            experiences.map((experience) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                onEdit={() => handleEdit(experience)}
                onDelete={() => handleDelete(experience.id)}
              />
            ))
          )}
        </CardContent>
      </Card>

      <WorkExperienceDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        experience={editingExperience}
        onSave={handleSave}
      />
    </>
  );
}
