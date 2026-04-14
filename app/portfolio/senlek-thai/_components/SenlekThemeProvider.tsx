"use client";

import { createContext, useContext, type ReactNode } from "react";

import { restaurantInfo } from "../_data/restaurant-info";

interface SenlekThemeContextValue {
  basePath: string;
  name: string;
}

const SenlekThemeContext = createContext<SenlekThemeContextValue>({
  basePath: restaurantInfo.basePath,
  name: restaurantInfo.displayName
});

export function SenlekThemeProvider({ children }: { children: ReactNode }) {
  return (
    <SenlekThemeContext.Provider
      value={{ basePath: restaurantInfo.basePath, name: restaurantInfo.displayName }}
    >
      <div className="senlek-theme min-h-screen bg-[var(--senlek-warm-white)] text-[var(--senlek-dark)]">
        {children}
      </div>
    </SenlekThemeContext.Provider>
  );
}

export function useSenlekTheme() {
  return useContext(SenlekThemeContext);
}
