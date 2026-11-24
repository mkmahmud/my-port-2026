'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { FAQS } from '@/components/sections/FAQ';

export function FaqList() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="fq-list">
      {FAQS.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.question} className={`fq-item ${expanded ? 'is-open' : ''}`}>
            <h3>
              <button type="button" aria-expanded={expanded} aria-controls={`fq-${index}`} onClick={() => setOpen(expanded ? null : index)}>
                <span>{item.question}</span>
                <Plus size={18} aria-hidden="true" />
              </button>
            </h3>
            <div id={`fq-${index}`} className="fq-answer" role="region">
              <div><p>{item.answer}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
