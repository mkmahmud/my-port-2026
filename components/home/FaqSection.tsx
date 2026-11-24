'use client';

import { Fragment, useId, useMemo, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight, MessageCircleQuestion, Plus, Search, X } from 'lucide-react';
import { FAQS } from '@/components/sections/FAQ';

const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function highlight(text: string, query: string): ReactNode {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${escape(query)})`, 'ig'));
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? <mark key={index}>{part}</mark> : <Fragment key={index}>{part}</Fragment>
  );
}

/** Searchable FAQ. Pass `bare` when the page already has its own title. */
export function FaqSection({ bare = false }: { bare?: boolean }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState<number | null>(FAQS[0]?.id ?? null);
  const searchId = useId();
  const q = query.trim();

  const items = useMemo(
    () => FAQS.filter((item) => !q || `${item.question} ${item.answer}`.toLowerCase().includes(q.toLowerCase())),
    [q]
  );

  return (
    <section className={`fx ${bare ? 'is-bare' : ''}`} aria-labelledby={bare ? undefined : 'fx-title'} aria-label={bare ? 'Frequently asked questions' : undefined}>
      <aside className="fx-side">
        {!bare && (
          <>
            <p className="tag">FAQ</p>
            <h2 id="fx-title">Good <span>Questions.</span></h2>
          </>
        )}
        <p className="fx-sub">Straight answers about how I work, what I build, and how we can start.</p>

        <div className="fx-search">
          <Search size={18} aria-hidden="true" />
          <label htmlFor={searchId} className="sr-only">Search questions</label>
          <input id={searchId} type="search" placeholder="Search questions…" value={query} onChange={(event) => setQuery(event.target.value)} />
          {query && (
            <button type="button" onClick={() => setQuery('')} aria-label="Clear search"><X size={16} /></button>
          )}
        </div>
        <p className="fx-count" aria-live="polite">{items.length} of {FAQS.length} questions</p>

        <div className="fx-help">
          <span className="fx-help-icon"><MessageCircleQuestion size={22} aria-hidden="true" /></span>
          <strong>Still have a question?</strong>
          <p>Ask me directly. I reply to every message by email.</p>
          <Link href="/contact" className="text-link">Ask me anything <ArrowRight size={15} /></Link>
        </div>
      </aside>

      <div className="fx-list">
        {items.length === 0 && (
          <div className="fx-empty">
            <p>No answers match &ldquo;{q}&rdquo;.</p>
            <Link href="/contact" className="text-link">Ask it directly <ArrowRight size={15} /></Link>
          </div>
        )}
        {items.map((item) => {
          const expanded = open === item.id || Boolean(q);
          const number = String(FAQS.indexOf(item) + 1).padStart(2, '0');
          return (
            <div key={item.id} className={`fx-item ${expanded ? 'is-open' : ''}`}>
              <h3>
                <button type="button" aria-expanded={expanded} aria-controls={`fx-a-${item.id}`} onClick={() => setOpen(open === item.id ? null : item.id)}>
                  <span className="fx-num">{number}</span>
                  <span className="fx-q">{highlight(item.question, q)}</span>
                  <span className="fx-icon" aria-hidden="true"><Plus size={18} /></span>
                </button>
              </h3>
              <div id={`fx-a-${item.id}`} className="fx-a" role="region">
                <div><p>{highlight(item.answer, q)}</p></div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
