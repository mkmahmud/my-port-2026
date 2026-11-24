import { SKILLS } from '@/lib/constants';
import { iconFor } from './iconFor';

// DevOps leads the toolkit; the rest keep their order.
const GROUPS = [...SKILLS].sort((a, b) => Number(b.title.startsWith('DevOps')) - Number(a.title.startsWith('DevOps')));

export function SkillsGrid() {
  const total = SKILLS.reduce((sum, group) => sum + group.skills.length, 0);
  return (
    <section className="sk" aria-labelledby="sk-title">
      <div className="sk-head">
        <p className="tag">Skills</p>
        <h2 id="sk-title">The <span>Toolkit.</span></h2>
        <p>{total} tools across {SKILLS.length} areas, from the interface down to the infrastructure.</p>
      </div>
      <ul className="sk-grid">
        {GROUPS.map((group) => (
          <li key={group.title} className="sk-card">
            <div className="sk-bar" aria-hidden="true"><i /><i /><i /><code>{group.command}</code></div>
            <div className="sk-body">
              <h3>{group.title}</h3>
              <ul aria-label={`${group.title} skills`}>
                {group.skills.map((skill) => {
                  const icon = iconFor(skill.name);
                  return (
                    <li key={skill.name}>
                      {icon
                        ? <svg width="24" height="24" viewBox="0 0 24 24" fill={icon.color} aria-hidden="true"><path d={icon.path} /></svg>
                        : <span className="sk-dot" aria-hidden="true" />}
                      {skill.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
