'use client'

import { useState } from 'react'

interface FAQAccordionProps {
  items: { pregunta: string; respuesta: string }[]
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="flex flex-col divide-y divide-[#2A2A2A]">
      {items.map((item, i) => (
        <div key={i}>
          <button
            className="w-full flex justify-between items-center py-5 text-left"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="font-sans font-medium text-base text-[#F5F5F5] pr-4">
              {item.pregunta}
            </span>
            <svg
              className={`w-5 h-5 text-[#9A9A9A] flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {open === i && (
            <div className="pb-5">
              <p className="font-body text-base text-[#9A9A9A] leading-relaxed">
                {item.respuesta}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
