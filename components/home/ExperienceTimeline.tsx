import { Award, Briefcase, Check, GraduationCap, MapPin } from 'lucide-react';
import { CERTIFICATIONS, EDUCATION, EXPERIENCE } from '@/lib/constants';
import { iconFor } from './iconFor';

const VISIBLE = 4;

const ROLES = [
  ...EXPERIENCE.map((job) => ({ ...job, current: job.endDate === 'Present' })),
  {
    role: 'Independent Consultant',
    company: 'Freelance',
    location: 'Remote',
    startDate: '2022',
    endDate: '2023',
    achievements: ['DevOps and full stack solutions for clients: CI/CD, cloud setup, and Next.js builds.'],
    techStack: ['Next.js', 'Docker', 'GitHub Actions', 'AWS'],
    current: false,
  },
];

export function ExperienceTimeline() {
  return (
    <section className="ex" aria-labelledby="ex-title">
      <div className="ex-side">
        <p className="tag">Experience</p>
        <h2 id="ex-title">Where I&apos;ve <span>Worked.</span></h2>
        <p>Shipping production systems for EdTech, SaaS, and enterprise teams, on site and remote.</p>
      </div>

      <ol className="ex-line">
        {ROLES.map((job) => {
          const more = job.achievements.length - VISIBLE;
          return (
            <li key={`${job.company}-${job.startDate}`} className={`ex-job ${job.current ? 'is-current' : ''}`}>
              <span className="ex-node" aria-hidden="true"><Briefcase size={15} /></span>
              <div className="ex-card">
                <p className="ex-date">{job.startDate} — {job.endDate}{job.current && <b>Now</b>}</p>
                <h3>{job.role} <span>@ {job.company}</span></h3>
                <p className="ex-where"><MapPin size={14} aria-hidden="true" /> {job.location}</p>
                <ul className="ex-wins">
                  {job.achievements.slice(0, VISIBLE).map((win) => (
                    <li key={win}><Check size={14} strokeWidth={3} aria-hidden="true" /> {win}</li>
                  ))}
                </ul>
                {more > 0 && (
                  <details className="ex-more">
                    <summary>Show {more} more</summary>
                    <ul className="ex-wins">
                      {job.achievements.slice(VISIBLE).map((win) => (
                        <li key={win}><Check size={14} strokeWidth={3} aria-hidden="true" /> {win}</li>
                      ))}
                    </ul>
                  </details>
                )}
                <ul className="ex-stack" aria-label="Tools used">
                  {(job.techStack ?? []).map((tool) => {
                    const icon = iconFor(tool);
                    return (
                      <li key={tool}>
                        {icon && <svg width="14" height="14" viewBox="0 0 24 24" fill={icon.color} aria-hidden="true"><path d={icon.path} /></svg>}
                        {tool}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="ex-learn">
        <h3 className="ex-sub">Education &amp; <span>Certifications</span></h3>
        <ul>
          {EDUCATION.map((item) => (
            <li key={item.institution}>
              <span className="ex-learn-icon"><GraduationCap size={20} aria-hidden="true" /></span>
              <div>
                <strong>{item.degree}, {item.field}</strong>
                <span>{item.institution}</span>
                <small>{item.startDate} — {item.endDate}</small>
              </div>
            </li>
          ))}
          {CERTIFICATIONS.map((item) => (
            <li key={item.title}>
              <span className="ex-learn-icon"><Award size={20} aria-hidden="true" /></span>
              <div>
                <strong>{item.title}</strong>
                <span>{item.issuer}</span>
                <small>{item.year}</small>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
