"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  educationSchema,
  type Education,
  type EducationItem,
} from "@/app/schemas/resume";
import { loadFromLocalStorage } from "@/lib/localStorage";
import { useAutoSave } from "@/hooks/useAutoSave";
import { useAutoSaveContext } from "@/context/AutoSaveContext";
import { EducationItem as EducationCard } from "./EducationItem";
import { EducationDialog } from "./EducationDialog";

export function Education() {
  const { isAutoSaveEnabled } = useAutoSaveContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEducation, setEditingEducation] =
    useState<EducationItem | null>(null);

  const { watch, setValue } = useForm<Education>({
    resolver: zodResolver(educationSchema),
    defaultValues: loadFromLocalStorage().education || { education: [] },
  });

  const education = watch("education");
  useAutoSave({ education }, "education", isAutoSaveEnabled);

  const handleAdd = () => {
    setEditingEducation(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (education: EducationItem) => {
    setEditingEducation(education);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setValue(
      "education",
      education.filter((edu) => edu.id !== id),
      { shouldDirty: true }
    );
  };

  const handleSave = (educationItem: EducationItem) => {
    if (editingEducation) {
      // Edit existing education
      setValue(
        "education",
        education.map((edu) =>
          edu.id === educationItem.id ? educationItem : edu
        ),
        { shouldDirty: true }
      );
    } else {
      // Add new education
      setValue("education", [...education, educationItem], {
        shouldDirty: true,
      });
    }
    setIsDialogOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Education</CardTitle>
          <Button onClick={handleAdd} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Education
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {education.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No education added yet. Click the button above to add your
              educational background.
            </p>
          ) : (
            education.map((edu) => (
              <EducationCard
                key={edu.id}
                education={edu}
                onEdit={() => handleEdit(edu)}
                onDelete={() => handleDelete(edu.id)}
              />
            ))
          )}
        </CardContent>
      </Card>

      <EducationDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        education={editingEducation}
        onSave={handleSave}
      />
    </>
  );
}
