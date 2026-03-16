"use client";

import { createContext, useContext, useState } from "react";

interface BugContextType {
  count: number;
  handleAdd: () => void;
  handleReset: () => void;
}

const BugContext = createContext<BugContextType>({
  count: 0,
  handleAdd: () => {},
  handleReset: () => {},
});

export const useZendesk = () => useContext(BugContext);

export function ZendeskProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);

  const handleAdd = () => setCount((c) => c + 1);
  const handleReset = () => setCount(0);
  return (
    <BugContext.Provider value={{ count, handleAdd, handleReset }}>
      {children}
    </BugContext.Provider>
  );
}
