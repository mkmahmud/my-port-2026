import { BRAND_ICONS } from './brandIcons';

const BY_LABEL = new Map(
  Object.values(BRAND_ICONS).map((icon) => [icon.label.toLowerCase().replace(/[^a-z0-9]/g, ''), icon])
);

const ALIASES: Record<string, string> = {
  reactjs: 'react',
  nextjs15: 'nextjs',
  nodejs: 'nodejs',
  awsec2rdss3: 'aws',
  awsrds: 'aws',
  githubactions: 'githubactions',
  tailwind: 'tailwindcss',
  postgres: 'postgresql',
  prismaorm: 'prisma',
};

/** Finds a brand logo for a tool name like "Next.js", "AWS (EC2, RDS, S3)", or "React 19". */
export function iconFor(name: string) {
  const key = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  const trimmed = key.replace(/\d+$/, '');
  return BY_LABEL.get(key) ?? BY_LABEL.get(ALIASES[key] ?? '') ?? BY_LABEL.get(trimmed) ?? BY_LABEL.get(ALIASES[trimmed] ?? '');
}
