"use client";

import { Check } from "lucide-react";
import {
  useTemplate,
  type TemplateType,
  type ColorScheme,
} from "@/context/TemplateContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const templates: { value: TemplateType; label: string }[] = [
  { value: "modern", label: "Modern" },
  { value: "classic", label: "Classic" },
  { value: "minimal", label: "Minimal" },
];

const colorSchemes: { value: ColorScheme; label: string; class: string }[] = [
  { value: "blue", label: "Blue", class: "bg-blue-500" },
  { value: "green", label: "Green", class: "bg-green-500" },
  { value: "purple", label: "Purple", class: "bg-purple-500" },
  { value: "gray", label: "Gray", class: "bg-gray-500" },
];

export function TemplateSelector() {
  const { template, setTemplate, colorScheme, setColorScheme } = useTemplate();

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <div className="space-y-2">
        <Label>Template Style</Label>
        <Select
          value={template}
          onValueChange={(value: TemplateType) => setTemplate(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select template" />
          </SelectTrigger>
          <SelectContent>
            {templates.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Color Scheme</Label>
        <div className="flex gap-2">
          {colorSchemes.map((color) => (
            <button
              key={color.value}
              className={cn(
                "w-8 h-8 rounded-full transition-all",
                color.class,
                colorScheme === color.value && "ring-2 ring-offset-2 ring-black"
              )}
              onClick={() => setColorScheme(color.value)}
              title={color.label}
            >
              {colorScheme === color.value && (
                <Check className="w-4 h-4 text-white mx-auto" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
