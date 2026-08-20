"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

type BootContextValue = {
  booted: boolean;
  complete: () => void;
};

const BootContext = createContext<BootContextValue>({
  booted: false,
  complete: () => {},
});

// The welcome screen calls `complete()` once its animation finishes. Until then
// `booted` stays false, so the dashboard holds its entrance animation hidden
// and lets the welcome screen be the first thing the visitor sees.
export function BootProvider({ children }: { children: ReactNode }) {
  const [booted, setBooted] = useState(false);
  const complete = useCallback(() => setBooted(true), []);

  return (
    <BootContext.Provider value={{ booted, complete }}>
      {children}
    </BootContext.Provider>
  );
}

export function useBoot() {
  return useContext(BootContext);
}
