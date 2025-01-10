"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";

interface AutoSaveHeaderProps {
  isAutoSaveEnabled: boolean;
  onAutoSaveChange: (enabled: boolean) => void;
  isSaving: boolean;
  lastSaved: Date | null;
}

export function AutoSaveHeader({
  isAutoSaveEnabled,
  onAutoSaveChange,
  isSaving,
  lastSaved,
}: AutoSaveHeaderProps) {
  return (
    <div className="border-b">
      <div className="container mx-auto py-4 px-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Resume Builder</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="auto-save"
                checked={isAutoSaveEnabled}
                onCheckedChange={onAutoSaveChange}
              />
              <Label htmlFor="auto-save" className="text-sm">
                Auto-save
              </Label>
            </div>
            {isSaving ? (
              <div className="flex items-center text-sm text-muted-foreground">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </div>
            ) : lastSaved ? (
              <p className="text-sm text-muted-foreground">
                Last saved: {lastSaved.toLocaleTimeString()}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
