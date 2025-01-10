import { ResumeData } from "./types";

const STORAGE_KEY = "resume-data";

export const saveToLocalStorage = (data: Partial<ResumeData>) => {
  if (typeof window === "undefined") return;

  const existingData = loadFromLocalStorage();
  const newData = { ...existingData, ...data, lastSaved: new Date() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
};

export const loadFromLocalStorage = (): Partial<ResumeData> => {
  if (typeof window === "undefined") return {};

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error("Error loading data from localStorage:", error);
    return {};
  }
};
