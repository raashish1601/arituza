"use client";

import { useEffect, useState } from "react";

import { restaurantInfo } from "../_data/restaurant-info";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

export function FAQAccordion() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="space-y-4">
        {restaurantInfo.faqItems.map((item, index) => (
          <div
            key={item.question}
            className="overflow-hidden rounded-[24px] border border-[rgba(57,73,171,0.12)] bg-white"
          >
            <div className="px-6 py-5 text-left text-base font-semibold text-[var(--senlek-blue-900)]">
              {item.question}
            </div>
            {index === 0 ? (
              <div className="px-6 pb-6 text-sm leading-7 text-[var(--senlek-warm-gray-500)]">{item.answer}</div>
            ) : null}
          </div>
        ))}
      </div>
    );
  }

  return (
    <Accordion type="single" collapsible defaultValue="item-0" className="space-y-4">
      {restaurantInfo.faqItems.map((item, index) => (
        <AccordionItem key={item.question} value={`item-${index}`}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
