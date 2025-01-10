"use client";

import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useDebouncedCallback } from "use-debounce";
import { saveToLocalStorage } from "@/lib/localStorage";
import { ResumeData } from "@/app/schemas/resume";

interface AutoSaveState {
  isSaving: boolean;
  lastSaved: Date | null;
}

export const useAutoSave = <T extends object>(
  data: T,
  key: keyof ResumeData,
  isEnabled: boolean = true
): AutoSaveState => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const previousDataRef = useRef<T | null>(null);
  const { toast } = useToast();

  // Helper function to check if data has changed
  const hasDataChanged = (newData: T) => {
    if (!previousDataRef.current) return true;
    return JSON.stringify(newData) !== JSON.stringify(previousDataRef.current);
  };

  // Debounced save function
  const debouncedSave = useDebouncedCallback(
    (newData: T) => {
      if (!isEnabled || !Object.keys(newData).length) return;

      // Only save if data has actually changed
      if (!hasDataChanged(newData)) return;

      setIsSaving(true);
      try {
        saveToLocalStorage({ [key]: newData } as Partial<ResumeData>);
        window.dispatchEvent(new Event("storage"));
        setLastSaved(new Date());
        previousDataRef.current = newData;
        toast({
          description: "Changes saved successfully",
          duration: 2000,
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error saving changes",
          description: "Please try again later",
        });
      } finally {
        setIsSaving(false);
      }
    },
    500 // 500ms delay
  );

  // Watch for data changes and trigger save
  useEffect(() => {
    if (isEnabled) {
      debouncedSave(data);
    }
  }, [data, debouncedSave, isEnabled]);

  return {
    isSaving,
    lastSaved,
  };
};
