"use client";

import { useState } from "react";

export interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

export function Accordion({ items, defaultOpenIndex }: { items: AccordionItem[]; defaultOpenIndex?: number }) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex ?? null);

  return (
    <div className="border-t border-line">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.title} className="border-b border-line">
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between py-4 text-left font-sans text-[15px] text-charcoal"
              aria-expanded={isOpen}
            >
              <span>{item.title}</span>
              <span
                className={`transition-transform duration-300 ease-smooth text-lg ${isOpen ? "rotate-45" : ""}`}
                aria-hidden
              >
                +
              </span>
            </button>
            <div
              className="grid transition-all duration-300 ease-smooth overflow-hidden"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div className="pb-5 text-sm leading-relaxed text-charcoal/70 font-sans">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
