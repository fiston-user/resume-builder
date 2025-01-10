"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "nanoid";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { educationItemSchema, type EducationItem } from "@/app/schemas/resume";

interface EducationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  education: EducationItem | null;
  onSave: (education: EducationItem) => void;
}

export function EducationDialog({
  open,
  onOpenChange,
  education,
  onSave,
}: EducationDialogProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<EducationItem>({
    resolver: zodResolver(educationItemSchema),
    defaultValues: {
      id: "",
      school: "",
      degree: "",
      field: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      achievements: [],
      gpa: "",
    },
  });

  const current = watch("current");

  // Reset form when dialog opens/closes or education changes
  useEffect(() => {
    if (open && education) {
      reset(education);
    } else if (open) {
      reset({
        id: nanoid(),
        school: "",
        degree: "",
        field: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
        achievements: [],
        gpa: "",
      });
    }
  }, [open, education, reset]);

  const onSubmit = (data: EducationItem) => {
    onSave(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {education ? "Edit Education" : "Add Education"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="school">School</Label>
            <Input
              id="school"
              {...register("school")}
              placeholder="University or Institution name"
            />
            {errors.school && (
              <p className="text-sm text-red-500">{errors.school.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="degree">Degree</Label>
              <Input
                id="degree"
                {...register("degree")}
                placeholder="e.g., Bachelor's, Master's"
              />
              {errors.degree && (
                <p className="text-sm text-red-500">{errors.degree.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="field">Field of Study</Label>
              <Input
                id="field"
                {...register("field")}
                placeholder="e.g., Computer Science"
              />
              {errors.field && (
                <p className="text-sm text-red-500">{errors.field.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              {...register("location")}
              placeholder="City, Country"
            />
            {errors.location && (
              <p className="text-sm text-red-500">{errors.location.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                {...register("startDate")}
                placeholder="MM/YYYY"
              />
              {errors.startDate && (
                <p className="text-sm text-red-500">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                {...register("endDate")}
                placeholder="MM/YYYY"
                disabled={current}
              />
              {errors.endDate && (
                <p className="text-sm text-red-500">{errors.endDate.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="current"
              checked={current}
              onCheckedChange={(checked) => {
                setValue("current", checked as boolean);
                if (checked) {
                  setValue("endDate", "");
                }
              }}
            />
            <Label htmlFor="current">I am currently studying here</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gpa">GPA (Optional)</Label>
            <Input id="gpa" {...register("gpa")} placeholder="e.g., 3.8" />
            {errors.gpa && (
              <p className="text-sm text-red-500">{errors.gpa.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Describe your studies, thesis, or notable coursework..."
              className="min-h-[100px]"
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

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
      </DialogContent>
    </Dialog>
  );
}
