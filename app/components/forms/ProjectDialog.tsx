"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { projectItemSchema, type ProjectItem } from "@/app/schemas/resume";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface ProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: ProjectItem | null;
  onSave: (project: ProjectItem) => void;
}

export function ProjectDialog({
  open,
  onOpenChange,
  project,
  onSave,
}: ProjectDialogProps) {
  const form = useForm<ProjectItem>({
    resolver: zodResolver(projectItemSchema),
    defaultValues: {
      id: "",
      name: "",
      description: "",
      technologies: [],
      role: "",
      url: "",
      startDate: "",
      endDate: "",
      current: false,
      highlights: [],
    },
  });

  useEffect(() => {
    if (project) {
      form.reset(project);
    } else {
      form.reset({
        id: uuidv4(),
        name: "",
        description: "",
        technologies: [],
        role: "",
        url: "",
        startDate: "",
        endDate: "",
        current: false,
        highlights: [],
      });
    }
  }, [project, form]);

  const onSubmit = (values: ProjectItem) => {
    onSave(values);
    form.reset();
  };

  const addTechnology = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const input = e.currentTarget;
      const value = input.value.trim();
      if (value) {
        const currentTech = form.getValues("technologies");
        if (!currentTech.includes(value)) {
          form.setValue("technologies", [...currentTech, value], {
            shouldDirty: true,
          });
        }
        input.value = "";
      }
    }
  };

  const removeTechnology = (tech: string) => {
    const currentTech = form.getValues("technologies");
    form.setValue(
      "technologies",
      currentTech.filter((t) => t !== tech),
      { shouldDirty: true }
    );
  };

  const addHighlight = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const input = e.currentTarget;
      const value = input.value.trim();
      if (value) {
        const currentHighlights = form.getValues("highlights");
        form.setValue("highlights", [...currentHighlights, value], {
          shouldDirty: true,
        });
        input.value = "";
      }
    }
  };

  const removeHighlight = (index: number) => {
    const currentHighlights = form.getValues("highlights");
    form.setValue(
      "highlights",
      currentHighlights.filter((_, i) => i !== index),
      { shouldDirty: true }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{project ? "Edit Project" : "Add Project"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter project name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Role</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Lead Developer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the project and your contributions"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="technologies"
              render={() => (
                <FormItem>
                  <FormLabel>Technologies Used</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Type and press Enter to add technologies"
                      onKeyDown={addTechnology}
                    />
                  </FormControl>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {form.watch("technologies").map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {tech}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeTechnology(tech)}
                        />
                      </Badge>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com"
                      type="url"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="month" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input
                        type="month"
                        disabled={form.watch("current")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="current"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Current Project</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="highlights"
              render={() => (
                <FormItem>
                  <FormLabel>Key Highlights</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Type and press Enter to add highlights"
                      onKeyDown={addHighlight}
                    />
                  </FormControl>
                  <ul className="space-y-2 mt-2">
                    {form.watch("highlights").map((highlight, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between text-sm bg-secondary rounded-md p-2"
                      >
                        {highlight}
                        <X
                          className="h-4 w-4 cursor-pointer"
                          onClick={() => removeHighlight(index)}
                        />
                      </li>
                    ))}
                  </ul>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
