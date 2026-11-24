'use client';

import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { AlertCircle, ArrowRight, Check, ChevronDown, LoaderCircle, RotateCcw } from 'lucide-react';
import { emailjsConfig } from '@/lib/config';
import { SITE_CONFIG } from '@/lib/constants';

const SERVICES = ['Full stack web app', 'DevOps & cloud', 'Backend & APIs', 'AI & LLM integration', 'Frontend & UI', 'Something else'];
const BUDGETS = ['< $1k', '$1k – $3k', '$3k – $5k', '$5k – $10k', '$10k+'];
const COUNTRIES = ['Bangladesh', 'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'Netherlands', 'United Arab Emirates', 'Singapore', 'India', 'Other'];
const MAX = 2000;

type Fields = { name: string; email: string; phone: string; service: string; budget: string; country: string; message: string; website: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = 'idle' | 'sending' | 'sent' | 'error';

const EMPTY: Fields = { name: '', email: '', phone: '', service: '', budget: '', country: '', message: '', website: '' };

function validate(values: Fields): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  if (values.phone && !/^[+\d\s().-]{6,40}$/.test(values.phone.trim())) errors.phone = 'Use digits, spaces, and + only.';
  if (values.message.trim().length < 10) errors.message = 'Tell me a little more, at least 10 characters.';
  if (values.message.length > MAX) errors.message = `Please keep it under ${MAX} characters.`;
  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [notice, setNotice] = useState('');
  const form = useRef<HTMLFormElement>(null);

  const update = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name as keyof Fields]) setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const pick = (name: 'service' | 'budget', value: string) => {
    setValues((current) => ({ ...current, [name]: current[name] === value ? '' : value }));
  };

  const focusFirst = (found: Errors) => {
    const first = (['name', 'email', 'phone', 'message'] as const).find((key) => found[key]);
    if (first) form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (status === 'sending') return;
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      focusFirst(found);
      return;
    }

    setStatus('sending');
    setNotice('');
    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim() || undefined,
      service: values.service || undefined,
      budget: values.budget || undefined,
      country: values.country || undefined,
      message: values.message.trim(),
      website: values.website,
    };

    // 1. Save the message on the server first, so nothing is lost if email fails.
    let stored = false;
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));
      if (response.status === 400 && data.fieldErrors) {
        setErrors(data.fieldErrors);
        focusFirst(data.fieldErrors);
        setStatus('idle');
        return;
      }
      if (response.status === 429) {
        setStatus('error');
        setNotice(data.error ?? 'Too many messages. Please wait a few minutes.');
        return;
      }
      stored = response.ok && data.stored !== false;
      if (response.ok && data.stored === false) {
        // Honeypot tripped: quietly finish without emailing.
        setStatus('sent');
        return;
      }
    } catch {
      stored = false;
    }

    // 2. Email the message straight to my inbox.
    let emailed = false;
    const { serviceId, templateId, publicKey, recipientEmail } = emailjsConfig;
    if (serviceId && templateId && publicKey) {
      try {
        const fields = {
          name: payload.name,
          email: payload.email,
          phone: payload.phone ?? 'N/A',
          service: payload.service ?? 'Not specified',
          budget: payload.budget ?? 'Not specified',
          country: payload.country ?? 'Not specified',
          message: payload.message,
        };
        await emailjs.send(
          serviceId,
          templateId,
          {
            ...fields,
            Name: fields.name,
            Email: fields.email,
            Phone: fields.phone,
            Service: fields.service,
            Budget: fields.budget,
            Country: fields.country,
            Message_Content: fields.message,
            reply_to: fields.email,
            to_email: recipientEmail,
            recipient_email: recipientEmail,
            submitted_at: new Date().toLocaleString(),
          },
          { publicKey }
        );
        emailed = true;
      } catch (error) {
        console.error('EmailJS send failed:', error);
      }
    }

    if (emailed || stored) {
      setStatus('sent');
      setValues(EMPTY);
      setErrors({});
    } else {
      setStatus('error');
      setNotice('Your message could not be sent. Please email me directly instead.');
    }
  };

  if (status === 'sent') {
    return (
      <div className="cf-done" role="status">
        <span className="cf-done-icon"><Check size={34} strokeWidth={3} aria-hidden="true" /></span>
        <h3>Message sent.</h3>
        <p>Thanks for reaching out. I read every message and will reply to your email soon.</p>
        <button type="button" className="cf-again" onClick={() => setStatus('idle')}>
          <RotateCcw size={15} aria-hidden="true" /> Send another message
        </button>
      </div>
    );
  }

  const field = (name: keyof Fields) => ({
    id: `cf-${name}`,
    name,
    value: values[name],
    onChange: update,
    'aria-invalid': Boolean(errors[name]) || undefined,
    'aria-describedby': errors[name] ? `cf-${name}-error` : undefined,
  });

  const error = (name: keyof Fields) =>
    errors[name] ? <p id={`cf-${name}-error`} className="cf-error"><AlertCircle size={14} aria-hidden="true" /> {errors[name]}</p> : null;

  return (
    <form ref={form} className="cf" onSubmit={submit} noValidate>
      <div className="cf-row">
        <div className="cf-field">
          <label htmlFor="cf-name">Your name</label>
          <input {...field('name')} type="text" autoComplete="name" placeholder="Jane Cooper" maxLength={100} />
          {error('name')}
        </div>
        <div className="cf-field">
          <label htmlFor="cf-email">Email</label>
          <input {...field('email')} type="email" autoComplete="email" placeholder="jane@company.com" maxLength={160} />
          {error('email')}
        </div>
      </div>

      <fieldset className="cf-field">
        <legend>What do you need?</legend>
        <div className="cf-chips">
          {SERVICES.map((service) => (
            <button key={service} type="button" className={values.service === service ? 'is-on' : ''} aria-pressed={values.service === service} onClick={() => pick('service', service)}>
              {values.service === service && <Check size={14} strokeWidth={3} aria-hidden="true" />}
              {service}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="cf-field">
        <legend>Budget <span>(USD, optional)</span></legend>
        <div className="cf-chips">
          {BUDGETS.map((budget) => (
            <button key={budget} type="button" className={values.budget === budget ? 'is-on' : ''} aria-pressed={values.budget === budget} onClick={() => pick('budget', budget)}>
              {budget}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="cf-row">
        <div className="cf-field">
          <label htmlFor="cf-phone">Phone <span>(optional)</span></label>
          <input {...field('phone')} type="tel" autoComplete="tel" placeholder="+880 1XXX-XXXXXX" maxLength={40} />
          {error('phone')}
        </div>
        <div className="cf-field">
          <label htmlFor="cf-country">Country <span>(optional)</span></label>
          <div className="cf-select">
            <select {...field('country')} autoComplete="country-name">
              <option value="">Select a country</option>
              {COUNTRIES.map((country) => <option key={country} value={country}>{country}</option>)}
            </select>
            <ChevronDown size={16} aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="cf-field">
        <label htmlFor="cf-message">Your message</label>
        <textarea {...field('message')} rows={6} placeholder="Tell me about the project, the problem, and your timeline." maxLength={MAX} />
        <div className="cf-meta">
          {error('message') ?? <span />}
          <span className={values.message.length > MAX * 0.9 ? 'is-near' : ''}>{values.message.length} / {MAX}</span>
        </div>
      </div>

      {/* Hidden from people, tempting to bots. */}
      <div className="cf-trap" aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={update} />
      </div>

      {status === 'error' && (
        <div className="cf-alert" role="alert">
          <AlertCircle size={18} aria-hidden="true" />
          <span>{notice} <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a></span>
        </div>
      )}

      <button type="submit" className="hx-primary cf-submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send Message'}
        <span aria-hidden="true">{status === 'sending' ? <LoaderCircle size={16} className="cf-spin" /> : <ArrowRight size={16} />}</span>
      </button>
    </form>
  );
}
