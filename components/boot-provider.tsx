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
