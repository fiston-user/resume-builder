"use client";

import { createContext, useContext, useState, useEffect } from "react";

export type SectionType =
  | "summary"
  | "skills"
  | "experience"
  | "education"
  | "projects";

interface Section {
  id: SectionType;
  title: string;
  visible: boolean;
}

const defaultSections: Section[] = [
  { id: "summary", title: "Professional Summary", visible: true },
  { id: "skills", title: "Skills", visible: true },
  { id: "experience", title: "Work Experience", visible: true },
  { id: "education", title: "Education", visible: true },
  { id: "projects", title: "Projects", visible: true },
];

interface SectionOrderContextType {
  sections: Section[];
  setSections: (sections: Section[]) => void;
  toggleSection: (id: SectionType) => void;
  isSectionVisible: (id: SectionType) => boolean;
}

const SectionOrderContext = createContext<SectionOrderContextType | undefined>(
  undefined
);

export function SectionOrderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sections, setSections] = useState<Section[]>(defaultSections);

  // Load saved order from localStorage
  useEffect(() => {
    const savedSections = localStorage.getItem("sectionOrder");
    if (savedSections) {
      setSections(JSON.parse(savedSections));
    }
  }, []);

  // Save order to localStorage
  useEffect(() => {
    localStorage.setItem("sectionOrder", JSON.stringify(sections));
  }, [sections]);

  const toggleSection = (id: SectionType) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, visible: !section.visible } : section
      )
    );
  };

  const isSectionVisible = (id: SectionType) => {
    return sections.find((section) => section.id === id)?.visible ?? true;
  };

  return (
    <SectionOrderContext.Provider
      value={{ sections, setSections, toggleSection, isSectionVisible }}
    >
      {children}
    </SectionOrderContext.Provider>
  );
}

export function useSectionOrder() {
  const context = useContext(SectionOrderContext);
  if (context === undefined) {
    throw new Error(
      "useSectionOrder must be used within a SectionOrderProvider"
    );
  }
  return context;
}
