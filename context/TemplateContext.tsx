"use client";

import { createContext, useContext, useState } from "react";

export type TemplateType = "modern" | "classic" | "minimal";
export type ColorScheme = "blue" | "green" | "purple" | "gray";

interface TemplateContextType {
  template: TemplateType;
  setTemplate: (template: TemplateType) => void;
  colorScheme: ColorScheme;
  setColorScheme: (color: ColorScheme) => void;
}

const TemplateContext = createContext<TemplateContextType | undefined>(
  undefined
);

export function TemplateProvider({ children }: { children: React.ReactNode }) {
  const [template, setTemplate] = useState<TemplateType>("modern");
  const [colorScheme, setColorScheme] = useState<ColorScheme>("blue");

  return (
    <TemplateContext.Provider
      value={{ template, setTemplate, colorScheme, setColorScheme }}
    >
      {children}
    </TemplateContext.Provider>
  );
}

export function useTemplate() {
  const context = useContext(TemplateContext);
  if (context === undefined) {
    throw new Error("useTemplate must be used within a TemplateProvider");
  }
  return context;
}
