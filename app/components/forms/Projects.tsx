"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  projectsSchema,
  type Projects,
  type ProjectItem,
} from "@/app/schemas/resume";
import { loadFromLocalStorage } from "@/lib/localStorage";
import { useAutoSave } from "@/hooks/useAutoSave";
import { useAutoSaveContext } from "@/context/AutoSaveContext";
import { ProjectItem as ProjectCard } from "./ProjectItem";
import { ProjectDialog } from "./ProjectDialog";

export function Projects() {
  const { isAutoSaveEnabled } = useAutoSaveContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(
    null
  );

  const { watch, setValue } = useForm<Projects>({
    resolver: zodResolver(projectsSchema),
    defaultValues: loadFromLocalStorage().projects || { projects: [] },
  });

  const projects = watch("projects");
  useAutoSave({ projects }, "projects", isAutoSaveEnabled);

  const handleAdd = () => {
    setEditingProject(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (project: ProjectItem) => {
    setEditingProject(project);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setValue(
      "projects",
      projects.filter((project) => project.id !== id),
      { shouldDirty: true }
    );
  };

  const handleSave = (projectItem: ProjectItem) => {
    if (editingProject) {
      // Edit existing project
      setValue(
        "projects",
        projects.map((project) =>
          project.id === projectItem.id ? projectItem : project
        ),
        { shouldDirty: true }
      );
    } else {
      // Add new project
      setValue("projects", [...projects, projectItem], {
        shouldDirty: true,
      });
    }
    setIsDialogOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Projects</CardTitle>
          <Button onClick={handleAdd} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {projects.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No projects added yet. Click the button above to add your
              projects.
            </p>
          ) : (
            projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={() => handleEdit(project)}
                onDelete={() => handleDelete(project.id)}
              />
            ))
          )}
        </CardContent>
      </Card>

      <ProjectDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        project={editingProject}
        onSave={handleSave}
      />
    </>
  );
}
