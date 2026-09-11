import { SiteConfig, NavLink, SkillCategory, ExperienceEntry, EducationEntry, Project } from './types';

export const SITE_CONFIG: SiteConfig = {
  name: 'Mahmudul Hasan',
  role: 'Full Stack Developer & AI Engineer',
  tagline: 'Building intelligent systems from database to deployment.',
  description: 'Full Stack Developer & AI Engineer based in Dhaka, Bangladesh. Specializing in Next.js, React, Node.js, Python, and AI/ML integrations.',
  location: 'Dhaka, Bangladesh',
  email: 'mkmahmud.dev@gmail.com',
  github: 'https://github.com/mkmahmud',
  linkedin: 'https://linkedin.com/in/mkmahmud',
  resumeUrl: '/resume.pdf',
  available: true,
  availabilityText: 'Open to opportunities'
};

export const NAV_LINKS: NavLink[] = [
  { label: 'About', href: '#about', sectionId: 'about' },
  { label: 'Skills', href: '#skills', sectionId: 'skills' },
  { label: 'Experience', href: '#experience', sectionId: 'experience' },
  { label: 'Projects', href: '#projects', sectionId: 'projects' },
  { label: 'Education', href: '#education', sectionId: 'education' },
  { label: 'Contact', href: '#contact', sectionId: 'contact' }
];

export const SKILLS: SkillCategory[] = [
  {
    title: 'Frontend',
    command: '$ ls ./frontend',
    skills: [
      { name: 'TypeScript' }, { name: 'JavaScript' }, { name: 'React' },
      { name: 'Next.js' }, { name: 'Redux Toolkit' }, { name: 'Zustand' },
      { name: 'Tailwind CSS' }, { name: 'Shadcn/UI' }, { name: 'Chakra UI' },
      { name: 'Zod' }, { name: 'Bootstrap' }, { name: 'Ant Design' },
      { name: 'SASS/SCSS' }
    ]
  },
  {
    title: 'Backend',
    command: '$ ls ./backend',
    skills: [
      { name: 'Node.js' }, { name: 'NestJS' }, { name: 'Express' },
      { name: 'Python' }, { name: 'FastAPI' }, { name: 'GraphQL' },
      { name: 'tRPC' }, { name: 'Socket.io' }, { name: 'Microservices' }
    ]
  },
  {
    title: 'Databases',
    command: '$ ls ./databases',
    skills: [
      { name: 'PostgreSQL' }, { name: 'MongoDB' }, { name: 'MySQL' },
      { name: 'Prisma' }, { name: 'Mongoose' }, { name: 'Redis' },
      { name: 'Supabase' }, { name: 'Firebase' }, { name: 'VectorDB' },
      { name: 'AWS RDS' }
    ]
  },
  {
    title: 'AI/ML',
    command: '$ ls ./ai-ml',
    skills: [
      { name: 'LangChain' }, { name: 'LangGraph' }, { name: 'RAG Pipelines' },
      { name: 'OpenAI API' }
    ]
  },
  {
    title: 'DevOps/Cloud',
    command: '$ ls ./devops',
    skills: [
      { name: 'Docker' }, { name: 'AWS' }, { name: 'Vercel' },
      { name: 'CI/CD' }, { name: 'GitHub Actions' }, { name: 'n8n' }
    ]
  },
  {
    title: 'Testing/Tools',
    command: '$ ls ./tools',
    skills: [
      { name: 'Git' }, { name: 'Jest' }, { name: 'pytest' }
    ]
  }
];

export const EXPERIENCE: ExperienceEntry[] = [
  {
    role: 'Full Stack Developer',
    company: 'Codexmine',
    location: 'Dhaka, Bangladesh',
    startDate: 'Mar 2026',
    endDate: 'Present',
    achievements: [
      'Built a comprehensive educational institute management system covering biometric attendance, academic scheduling, HR, student records, and expense tracking',
      'Developed an automated result management module with a computer-vision OMR sheet checker for answer sheet scanning',
      'Engineered a RAG chatbot using LangChain for intelligent document retrieval and contextual Q&A',
      "Created 'AI Sales Pilot' — an automated system for lead research, outreach email generation, and sending via AI agents"
    ]
  },
  {
    role: 'Full Stack Developer',
    company: 'LeoPhoenix',
    location: 'US (Remote)',
    startDate: 'Oct 2023',
    endDate: 'Feb 2026',
    achievements: [
      'Built production applications with Next.js, TypeScript, React, NestJS, PostgreSQL, GraphQL, Socket.io, Redis, and Tailwind/Shadcn',
      'Implemented JWT authentication with role-based access control (RBAC) across multiple services',
      'Integrated Stripe payment processing and OpenAI API for intelligent features',
      'Deployed and maintained applications on AWS and Vercel with CI/CD pipelines'
    ],
    techStack: ['Next.js', 'TypeScript', 'React', 'NestJS', 'PostgreSQL', 'GraphQL', 'Socket.io', 'Redis']
  }
];

export const EDUCATION: EducationEntry[] = [
  {
    institution: 'Uttara University',
    degree: "Bachelor's Degree",
    startDate: 'May 2022',
    endDate: 'Apr 2026'
  }
];

export const STATS = {
  yearsExperience: 3,
  projectsShipped: 15,
  technologies: 25
};

export const BIO = `Hey there! I'm a full-stack developer with a passion for building intelligent, high-performance systems from the database layer up to deployment. With a strong background working with React, Next.js, Node.js, and Python, I enjoy solving complex problems and turning innovative ideas into robust digital products.

Recently, I've been diving deep into the AI ecosystem, leveraging LangChain and RAG pipelines to bring autonomous agents and contextual Q&A to life. I also value solid CI/CD practices and clean infrastructure, ensuring everything runs smoothly in production using Docker, AWS, and modern DevOps strategies.

I'm always open to new challenges and eager to collaborate with passionate teams to ship features that matter. Let's build something awesome together!`;

export const DEFAULT_PROJECTS: Project[] = [
  {
    _id: '65e1b277a7ac12bc31b1aabd',
    title: 'Blossom Academy',
    projectTitle: 'Blossom Academy',
    slug: 'blossom-academy',
    projectType: 'case-study',
    projectFor: 'mahmudulmk4@gmail.com',
    projectKeyWord: 'Education, Learning, Real-time Classrooms',
    description: 'An online education platform with live 30-student batches, real-time classroom chat, automated attendance, and CQ/MCQ examination system.',
    longDescription: 'This is an online education platform where students can learn different subjects. Only students can sign up and others will be assigned by admin. Admin/management sets course details with restricted 30-student batches and one-to-one sessions. Features automated 10-minute pre-class alerts, classroom chat, teacher-initiated one-click attendance, and an integrated CQ and MCQ examination engine with automated grading.',
    overview: [
      'This is an online education platform where students can learn different subjects. Only students can sign up and others will be assigned by admin. Admin and management configure course details and batch limits of 30 students with dedicated 1-on-1 sessions.',
      'Management sets class times and assigns teachers, triggering automatic notifications to all participants 10 minutes before class starts. The interactive classroom features real-time chat and an automated attendance system that records student participation seamlessly when opened by the instructor.',
      'The platform integrates an online exam system with both Multiple Choice Questions (MCQ) and Creative Questions (CQ), allowing authorized educators to distribute custom question papers and students to track their ongoing performance.'
    ],
    techStack: [
      'React', 'Redux', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'Axios', 'JWT', 'Tailwind CSS', 'Firebase', 'React PDF', 'GitHub'
    ],
    Technologies: [
      'React', 'Redux', 'JavaScript', 'TypeScript', 'Node', 'Express', 'MongoDB', 'Mongoose', 'Axios', 'JWT', 'Tailwind', 'Firebase', 'Font Awesome', 'React PDF', 'GitHub'
    ],
    category: [
      'Full Stack Development', 'Education website', 'Web Development', 'Front-end Development'
    ],
    projectCategory: [
      'Web Development', 'Education website', 'Front-end Development', 'Full Stack Development'
    ],
    challenges: [
      'Implementing a real-time chat system within the classroom requiring high scalability, responsiveness, and multi-device synchronization.',
      'Designing and implementing a notification system that reliably delivers timely alerts to all users before classes start.',
      'Developing a seamless attendance system that automatically stores attendance when the teacher initiates it, preventing tampering and maintaining accuracy.',
      'Creating an intuitive and user-friendly interface that caters to diverse users including students, teachers, and administrators.',
      'Optimizing platform throughput to ensure smooth operation, instant response times, and minimal downtime during peak class hours.'
    ],
    solutions: [
      'Architected event-driven WebSocket channels with room-level multiplexing for zero-latency classroom discussions.',
      'Scheduled distributed background workers to trigger automated notification dispatches 10 minutes prior to every scheduled class.',
      'Implemented a cryptographically verified teacher-triggered attendance window that authenticates student presence in a single click.',
      'Constructed role-based dashboards tailored for students, teachers, and platform administrators with modular UI components.'
    ],
    features: [
      'Live Batch System: Accommodates maximum 30 students per batch with strict course enrollment and authorized email verification.',
      'Profile Management: Students manage profiles independently with administrative oversight for privileged updates.',
      'Drag-and-Drop Skills Section: User-friendly interactive drag-and-drop tool for organizing and updating competencies.',
      'Notification System: Automated alerts for class start countdowns, syllabus uploads, and exam schedules.',
      'Admin & Management Control: Full authority over batches, user assignments, educator allocation, and exam publishing.'
    ],
    thumbnailUrl: 'https://i.ibb.co/Kz6SST6B/Whats-App-Image-2025-07-20-at-02-31-35-63e4d26c.jpg',
    images: [
      'https://i.ibb.co/Kz6SST6B/Whats-App-Image-2025-07-20-at-02-31-35-63e4d26c.jpg',
      'https://i.ibb.co/N23kTS5b/Whats-App-Image-2025-07-20-at-02-33-42-3eee9450.jpg'
    ],
    gellaryImages: [
      'https://i.ibb.co/Kz6SST6B/Whats-App-Image-2025-07-20-at-02-31-35-63e4d26c.jpg',
      'https://i.ibb.co/N23kTS5b/Whats-App-Image-2025-07-20-at-02-33-42-3eee9450.jpg'
    ],
    liveUrl: 'https://blossom-academy.netlify.app/',
    liveSite: 'https://blossom-academy.netlify.app/',
    duration: 'Active Development',
    Duration: 'I am currently working on this porject',
    developersRole: 'Solo Full Stack Developer',
    result: 'The online education platform offers a streamlined learning experience where students can easily sign up for courses, with admin-assigned access for others. Admins set course details, including limited 30-student batches, fostering personalized learning through one-to-one sessions. Management notifies participants 10 minutes before classes, which feature chat options and automated attendance. Only selected students and teachers join the class, ensuring a focused environment. The platform integrates a comprehensive online exam system with both multiple-choice and descriptive formats, allowing selected teachers to assign new question papers. Students receive performance feedback, creating a dynamic and secure online learning community that optimizes the educational journey for all users.',
    Result: 'The online education platform offers a streamlined learning experience where students can easily sign up for courses, with admin-assigned access for others. Admins set course details, including limited 30-student batches, fostering personalized learning through one-to-one sessions. Management notifies participants 10 minutes before classes, which feature chat options and automated attendance. Only selected students and teachers join the class, ensuring a focused environment. The platform integrates a comprehensive online exam system with both multiple-choice and descriptive formats, allowing selected teachers to assign new question papers. Students receive performance feedback, creating a dynamic and secure online learning community that optimizes the educational journey for all users.',
    projectID: 25,
    featured: true,
    order: 1,
    createdAt: '2026-03-05T00:00:00.000Z',
    updatedAt: '2026-03-05T00:00:00.000Z',
  },
  {
    _id: '1',
    title: 'Codex Edumine',
    slug: 'codex-edumine',
    projectType: 'case-study',
    description: 'Comprehensive school & coaching-centre management platform with biometric attendance, OMR scanning, and automated result management.',
    longDescription: 'A modern, full-stack ERP built specifically for educational institutions. The frontend leverages Next.js and React 19 with TypeScript for a highly responsive interface. On the backend, FastAPI powered by async SQLAlchemy 2.0 and PostgreSQL ensures robust performance. It features granular RBAC across 8 different roles and streamlined CI/CD pipelines via GitHub Actions to a VM (Nginx + systemd), along with audit logging and rate limiting.',
    overview: [
      'Codex Edumine is an end-to-end ERP ecosystem engineered for modern schools and coaching academies.',
      'It combines physical hardware integration via biometric attendance scanners with a custom computer-vision answer sheet evaluation pipeline that grades 25-question OMR sheets in under 3 milliseconds.'
    ],
    challenges: [
      'Processing distorted or low-light phone camera captures of student answer sheets with high grading accuracy.',
      'Handling high-concurrency biometric attendance clock-ins during morning peak arrivals without database contention.'
    ],
    solutions: [
      'Constructed a multi-stage OpenCV image normalization pipeline with contour perspective warping and threshold detection.',
      'Implemented async connection pooling with Redis buffer queues for real-time biometric ingestion.'
    ],
    features: [
      'Biometric Terminal Sync: Connects with physical RFID and fingerprint devices to register attendance in real-time.',
      'OMR Computer-Vision Engine: Automated grading of physical MCQ bubble sheets directly from photos.',
      'Academic & Financial Ledger: Fee tracking, expense receipts, teacher payroll, and student gradebook generation.'
    ],
    techStack: ['Next.js', 'React 19', 'TypeScript', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'Python', 'GitHub Actions', 'Nginx'],
    category: ['Full Stack', 'AI/ML'],
    thumbnailUrl: '/images/projects/codex-edumine.svg',
    images: [],
    featured: true,
    order: 2,
    createdAt: '2026-03-01T00:00:00.000Z',
    updatedAt: '2026-03-01T00:00:00.000Z',
  },
  {
    _id: '2',
    title: 'SalesPilot',
    slug: 'salespilot',
    projectType: 'case-study',
    description: 'Multi-tenant AI sales automation SaaS with LangGraph agents, Celery workers, and idempotent job processing across 11 task queues.',
    longDescription: 'An advanced AI automation platform combining a FastAPI backend with a Next.js 15 frontend. The 6-service Docker Compose stack orchestrated via a swappable-vendor architecture supports massive scale. Powered by Celery, a robust beat scheduler, and row-level locking on PostgreSQL, it handles thousands of automated sales outreach jobs daily. Completely deployed on AWS with S3-compatible storage and Stripe billing integration.',
    overview: [
      'SalesPilot is an autonomous B2B outreach and lead research SaaS powered by agentic AI graphs.',
      'It researches prospects across web data sources, personalizes contextual email sequences, and executes outbound campaigns while maintaining deliverability standards.'
    ],
    challenges: [
      'Preventing race conditions and duplicate emails during high-throughput parallel outreach runs.',
      'Managing API token budgets and failover across multiple LLM providers.'
    ],
    solutions: [
      'Designed row-level pessimistic locking in PostgreSQL with idempotency keys across 11 Celery task queues.',
      'Engineered an abstracted vendor adapter layer with automatic fallback from primary to backup model providers.'
    ],
    features: [
      'Autonomous LangGraph Agents: Recursive research and personalized outreach email generation.',
      'Multi-tenant Isolation: Strict org-scoped cryptographic isolation with Stripe SaaS subscription gating.',
      'Distributed Celery Queues: 11 worker queues with beat scheduler handling retries and rate limits.'
    ],
    techStack: ['FastAPI', 'Next.js 15', 'LangGraph', 'Docker', 'Celery', 'PostgreSQL', 'Redis', 'AWS', 'Stripe'],
    category: ['Full Stack', 'AI/ML', 'DevOps'],
    thumbnailUrl: '/images/projects/salespilot.svg',
    images: [],
    featured: true,
    order: 3,
    createdAt: '2026-01-15T00:00:00.000Z',
    updatedAt: '2026-01-15T00:00:00.000Z',
  },
  {
    _id: '3',
    title: 'VCAD',
    slug: 'vcad',
    projectType: 'project',
    description: 'Figma-to-code implementation for Planet Education Networks with strong typing, reusable components, and polished loading/empty states.',
    longDescription: 'A meticulous translation of complex Figma designs into a fully functional React application. Built using Next.js and TypeScript, the project features a highly modular component architecture with comprehensive data modeling. Special attention was paid to creating a polished user experience with bespoke loading and empty states.',
    techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    category: ['Frontend'],
    thumbnailUrl: '/images/projects/vcad.svg',
    images: [],
    liveUrl: 'https://vcad-seven.vercel.app',
    githubUrl: 'https://github.com/mkmahmud/vcad',
    featured: false,
    order: 4,
    createdAt: '2025-11-20T00:00:00.000Z',
    updatedAt: '2025-11-20T00:00:00.000Z',
  },
  {
    _id: '4',
    title: 'CloudSync Dashboard',
    slug: 'cloudsync-dashboard',
    projectType: 'project',
    description: 'Real-time telemetry and infrastructure monitor dashboard with WebSocket streams and multi-cloud metric aggregation.',
    longDescription: 'Cloud infrastructure health and monitoring dashboard providing microsecond precision metric graphs and incident management workflows. Designed with responsive layouts and customizable panel grids.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Redis'],
    category: ['Frontend', 'DevOps'],
    thumbnailUrl: '',
    images: [],
    featured: false,
    order: 5,
    createdAt: '2025-08-10T00:00:00.000Z',
    updatedAt: '2025-08-10T00:00:00.000Z',
  },
  {
    _id: '5',
    title: 'DevFlow CLI',
    slug: 'devflow-cli',
    projectType: 'project',
    description: 'Developer productivity tool for automating branch hygiene, changelog generation, and multi-service local environment bootstrapping.',
    longDescription: 'Lightweight command-line interface engineered in Node.js and TypeScript. Coordinates containerized dev clusters, monitors lint/test health in background daemons, and automates conventional changelog production.',
    techStack: ['Node.js', 'TypeScript', 'Docker'],
    category: ['Backend Tools', 'DevOps'],
    thumbnailUrl: '',
    images: [],
    featured: false,
    order: 6,
    createdAt: '2025-06-05T00:00:00.000Z',
    updatedAt: '2025-06-05T00:00:00.000Z',
  }
];
