"use client";

import { useEffect } from "react";

export function Modal({
  isOpen,
  onClose,
  children,
  ariaLabel,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  ariaLabel: string;
}) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center">
      <div className="absolute inset-0 bg-ink/60" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        className="relative mt-0 sm:mt-16 w-full sm:max-w-2xl sm:rounded-md bg-cream max-h-screen sm:max-h-[80vh] overflow-y-auto animate-fade-up"
      >
        {children}
      </div>
    </div>
  );
}
