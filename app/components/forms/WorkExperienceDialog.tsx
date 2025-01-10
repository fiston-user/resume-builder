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
import {
  workExperienceItemSchema,
  type WorkExperienceItem,
} from "@/app/schemas/resume";

interface WorkExperienceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  experience: WorkExperienceItem | null;
  onSave: (experience: WorkExperienceItem) => void;
}

export function WorkExperienceDialog({
  open,
  onOpenChange,
  experience,
  onSave,
}: WorkExperienceDialogProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<WorkExperienceItem>({
    resolver: zodResolver(workExperienceItemSchema),
    defaultValues: {
      id: "",
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      highlights: [],
    },
  });

  const current = watch("current");

  // Reset form when dialog opens/closes or experience changes
  useEffect(() => {
    if (open && experience) {
      reset(experience);
    } else if (open) {
      reset({
        id: nanoid(),
        company: "",
        position: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
        highlights: [],
      });
    }
  }, [open, experience, reset]);

  const onSubmit = (data: WorkExperienceItem) => {
    onSave(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {experience ? "Edit Experience" : "Add Experience"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                {...register("company")}
                placeholder="Company name"
              />
              {errors.company && (
                <p className="text-sm text-red-500">{errors.company.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                {...register("position")}
                placeholder="Job title"
              />
              {errors.position && (
                <p className="text-sm text-red-500">
                  {errors.position.message}
                </p>
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
            <Label htmlFor="current">I currently work here</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Describe your role and responsibilities..."
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
