import { createContext, useContext, useMemo, useState } from "react";

const TutorContext = createContext(null);

export function TutorProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [focusQuestion, setFocusQuestion] = useState(null);

  const value = useMemo(
    () => ({
      open,
      focusQuestion,
      setFocusQuestion,
      openTutor: () => setOpen(true),
      closeTutor: () => setOpen(false),
      toggleTutor: () => setOpen((isOpen) => !isOpen),
    }),
    [open, focusQuestion],
  );

  return <TutorContext.Provider value={value}>{children}</TutorContext.Provider>;
}

export function useTutor() {
  const context = useContext(TutorContext);
  if (!context) throw new Error("useTutor must be used inside TutorProvider");
  return context;
}
