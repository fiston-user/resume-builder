"use client";

import { useState, useEffect } from "react";
import { useAutoSaveContext } from "@/context/AutoSaveContext";
import { AutoSaveHeader } from "./AutoSaveHeader";

export function AutoSaveHeaderWrapper() {
  const { isAutoSaveEnabled, setAutoSaveEnabled } = useAutoSaveContext();
  const [isSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Listen for save events from any component
  useEffect(() => {
    const handleStorage = () => {
      setLastSaved(new Date());
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <AutoSaveHeader
      isAutoSaveEnabled={isAutoSaveEnabled}
      onAutoSaveChange={setAutoSaveEnabled}
      isSaving={isSaving}
      lastSaved={lastSaved}
    />
  );
}
