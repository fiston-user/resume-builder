"use client";

import {
  professionalSummarySchema,
  type ProfessionalSummary,
} from "@/app/schemas/resume";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAutoSaveContext } from "@/context/AutoSaveContext";
import { useAutoSave } from "@/hooks/useAutoSave";
import { loadFromLocalStorage } from "@/lib/localStorage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function ProfessionalSummary() {
  const { isAutoSaveEnabled } = useAutoSaveContext();

  const {
    register,
    formState: { errors },
    watch,
  } = useForm<ProfessionalSummary>({
    resolver: zodResolver(professionalSummarySchema),
    defaultValues: loadFromLocalStorage().professionalSummary,
  });

  const formData = watch();
  useAutoSave(formData, "professionalSummary", isAutoSaveEnabled);

  // Character count
  const charCount = formData.summary?.length || 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Professional Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="summary">
            Write a brief summary of your professional background and key
            qualifications
          </Label>
          <Textarea
            id="summary"
            {...register("summary")}
            placeholder="A results-driven professional with X years of experience..."
            className="min-h-[150px] resize-none"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <div>
              {errors.summary && (
                <p className="text-red-500">{errors.summary.message}</p>
              )}
            </div>
            <div>{charCount}/500 characters</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
