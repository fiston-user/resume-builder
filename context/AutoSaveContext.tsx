"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AutoSaveContextType {
  isAutoSaveEnabled: boolean;
  setAutoSaveEnabled: (enabled: boolean) => void;
}

const AutoSaveContext = createContext<AutoSaveContextType | undefined>(
  undefined
);

export function AutoSaveProvider({ children }: { children: ReactNode }) {
  const [isAutoSaveEnabled, setAutoSaveEnabled] = useState(true);

  return (
    <AutoSaveContext.Provider
      value={{
        isAutoSaveEnabled,
        setAutoSaveEnabled,
      }}
    >
      {children}
    </AutoSaveContext.Provider>
  );
}

export function useAutoSaveContext() {
  const context = useContext(AutoSaveContext);
  if (context === undefined) {
    throw new Error(
      "useAutoSaveContext must be used within an AutoSaveProvider"
    );
  }
  return context;
}
