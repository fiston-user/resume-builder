"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  skillsSchema,
  type Skills,
  type SkillItem,
} from "@/app/schemas/resume";
import { loadFromLocalStorage } from "@/lib/localStorage";
import { useAutoSave } from "@/hooks/useAutoSave";
import { useAutoSaveContext } from "@/context/AutoSaveContext";
import { SkillItem as SkillCard } from "./SkillItem";
import { SkillDialog } from "./SkillDialog";

export function Skills() {
  const { isAutoSaveEnabled } = useAutoSaveContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<SkillItem | null>(null);

  const { watch, setValue } = useForm<Skills>({
    resolver: zodResolver(skillsSchema),
    defaultValues: loadFromLocalStorage().skills || { skills: [] },
  });

  const skills = watch("skills");
  useAutoSave({ skills }, "skills", isAutoSaveEnabled);

  const handleAdd = () => {
    setEditingSkill(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (skill: SkillItem) => {
    setEditingSkill(skill);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setValue(
      "skills",
      skills.filter((skill) => skill.id !== id),
      { shouldDirty: true }
    );
  };

  const handleSave = (skillItem: SkillItem) => {
    if (editingSkill) {
      // Edit existing skill
      setValue(
        "skills",
        skills.map((skill) => (skill.id === skillItem.id ? skillItem : skill)),
        { shouldDirty: true }
      );
    } else {
      // Add new skill
      setValue("skills", [...skills, skillItem], {
        shouldDirty: true,
      });
    }
    setIsDialogOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Skills</CardTitle>
          <Button onClick={handleAdd} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Skill
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {skills.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No skills added yet. Click the button above to add your skills.
            </p>
          ) : (
            skills.map((skill) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                onEdit={() => handleEdit(skill)}
                onDelete={() => handleDelete(skill.id)}
              />
            ))
          )}
        </CardContent>
      </Card>

      <SkillDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        skill={editingSkill}
        onSave={handleSave}
      />
    </>
  );
}
