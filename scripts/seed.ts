import { config } from 'dotenv';
import mongoose from 'mongoose';
import Project from '../models/Project';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env.local') });
config({ path: resolve(process.cwd(), '.env') });

const MONGODB_URI = process.env.MONGODB_URI;

const seedProjects = [
  {
    _id: new mongoose.Types.ObjectId('65e1b277a7ac12bc31b1aabd'),
    projectFor: 'mahmudulmk4@gmail.com',
    projectTitle: 'Blossom Academy',
    title: 'Blossom Academy',
    slug: 'blossom-academy',
    projectType: 'case-study',
    projectKeyWord: 'Education, Learning',
    description: 'An online education platform with live 30-student batches, real-time classroom chat, automated attendance, and CQ/MCQ examination system.',
    longDescription: 'This is an online education platform where students can learn different subjects. Only students can sign up and others will be assigned by admin. Admin/management sets course details with restricted 30-student batches and one-to-one sessions. Features automated 10-minute pre-class alerts, classroom chat, teacher-initiated one-click attendance, and an integrated CQ and MCQ examination engine with automated grading.',
    overview: [
      'This is an online education platform. Where Students can learn different subjects. Only Students can sign up and others will be assigned by admin. Admin /management will set course details. Each batch will be 30 students, Here should be one to one session. Management will set class time and assign teachers & everybody will get notification before 10 starting class. The classroom should have chat options and attendance system.When teacher opens attendance then student can click attendance button attendance will store automatically. Only selected students and teachers can join the class. We have to add the online exam system CQ and MCQ both. Only selected teachers can assign a new question paper for the selected batch. Students will get their performance. '
    ],
    Technologies: [
      'React', 'Redux', 'JavaScript', 'TypeScript', 'Node', 'Express', 'MongoDB', 'Mongoose', 'Axios', 'JWT', 'Tailwind', 'Firebase', 'Font Awesome', 'React PDF', 'GitHub'
    ],
    techStack: [
      'React', 'Redux', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'Axios', 'JWT', 'Tailwind CSS', 'Firebase', 'React PDF', 'GitHub'
    ],
    projectCategory: [
      'Web Development', 'Education website', 'Front-end Development', 'Full Stack Development'
    ],
    category: [
      'Full Stack Development', 'Education website', 'Web Development', 'Front-end Development'
    ],
    challenges: [
      'Implementing a real-time chat system within the classroom can be challenging, requiring considerations for scalability, responsiveness, and synchronization across different devices.',
      'Designing and implementing a notification system that reliably delivers timely alerts to all users, especially with the requirement of notifications before classes start, demands a robust infrastructure.',
      'Developing a seamless attendance system that automatically stores attendance when the teacher initiates it, while maintaining accuracy and preventing manipulation, is a challenge. ',
      'Creating an intuitive and user-friendly interface that caters to a diverse user base, including students, teachers, and administrators, requires thoughtful design and testing.',
      'Optimizing the performance of the platform to ensure smooth operation, quick response times, and minimal downtime, especially during peak usage, is crucial.'
    ],
    solutions: [
      'Architected event-driven WebSocket channels with room-level multiplexing for zero-latency classroom discussions.',
      'Scheduled distributed background workers to trigger automated notification dispatches 10 minutes prior to every scheduled class.',
      'Implemented a cryptographically verified teacher-triggered attendance window that authenticates student presence in a single click.',
      'Constructed role-based dashboards tailored for students, teachers, and platform administrators with modular UI components.'
    ],
    features: [
      'Live Batch System: A live batch system accommodating a maximum of 30 students per batch with the ability to select courses. Only students and teachers associated with specific batches can join classes using their registered email addresses.',
      'Profile Management: Students can manage their profiles independently. Approval from the admin or management is required for profile updates by other users.',
      'Drag-and-Drop Skills Section: A user-friendly drag-and-drop skills section, allowing users to seamlessly update and organize their skills.',
      'Notification System: Implementation of a robust notification system. Users can receive important notifications such as class reminders, document uploads, and other relevant updates.',
      'Admin/Management Control: Administrators and management have the capability to add new users, oversee batches, manage students, teachers, courses, and other administrative functions.'
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
    liveSite: 'https://blossom-academy.netlify.app/',
    liveUrl: 'https://blossom-academy.netlify.app/',
    Duration: 'I am currently working on this porject',
    duration: 'Active Development',
    developersRole: 'I am solo developer on this project',
    Result: 'The online education platform offers a streamlined learning experience where students can easily sign up for courses, with admin-assigned access for others. Admins set course details, including limited 30-student batches, fostering personalized learning through one-to-one sessions. Management notifies participants 10 minutes before classes, which feature chat options and automated attendance. Only selected students and teachers join the class, ensuring a focused environment. The platform integrates a comprehensive online exam system with both multiple-choice and descriptive formats, allowing selected teachers to assign new question papers. Students receive performance feedback, creating a dynamic and secure online learning community that optimizes the educational journey for all users.',
    result: 'The online education platform offers a streamlined learning experience where students can easily sign up for courses, with admin-assigned access for others. Admins set course details, including limited 30-student batches, fostering personalized learning through one-to-one sessions. Management notifies participants 10 minutes before classes, which feature chat options and automated attendance. Only selected students and teachers join the class, ensuring a focused environment. The platform integrates a comprehensive online exam system with both multiple-choice and descriptive formats, allowing selected teachers to assign new question papers. Students receive performance feedback, creating a dynamic and secure online learning community that optimizes the educational journey for all users.',
    projectID: 25,
    featured: true,
    order: 1,
  },
  {
    title: 'Codex Edumine',
    slug: 'codex-edumine',
    projectType: 'case-study',
    description: 'Comprehensive school & coaching-centre management platform with biometric attendance, OMR scanning, and automated result management.',
    longDescription: 'A modern, full-stack ERP built specifically for educational institutions. The frontend leverages Next.js and React 19 with TypeScript for a highly responsive interface. On the backend, FastAPI powered by async SQLAlchemy 2.0 and PostgreSQL ensures robust performance. It features granular RBAC across 8 different roles and streamlined CI/CD pipelines via GitHub Actions.',
    techStack: ['Next.js', 'React 19', 'TypeScript', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'Python', 'GitHub Actions', 'Nginx'],
    category: ['Full Stack', 'AI/ML'],
    thumbnailUrl: '/images/projects/codex-edumine.svg',
    featured: true,
    order: 2,
  },
  {
    title: 'SalesPilot',
    slug: 'salespilot',
    projectType: 'case-study',
    description: 'Multi-tenant AI sales automation SaaS with LangGraph agents, Celery workers, and idempotent job processing across 11 task queues.',
    longDescription: 'An advanced AI automation platform combining a FastAPI backend with a Next.js 15 frontend. The 6-service Docker Compose stack orchestrated via a swappable-vendor architecture supports massive scale. Powered by Celery, a robust beat scheduler, and row-level locking on PostgreSQL, it handles thousands of automated sales outreach jobs daily. Completely deployed on AWS with Stripe billing integration.',
    techStack: ['FastAPI', 'Next.js 15', 'LangGraph', 'Docker', 'Celery', 'PostgreSQL', 'Redis', 'AWS', 'Stripe'],
    category: ['Full Stack', 'AI/ML', 'DevOps'],
    thumbnailUrl: '/images/projects/salespilot.svg',
    featured: true,
    order: 3,
  },
  {
    title: 'VCAD',
    slug: 'vcad',
    projectType: 'project',
    description: 'Figma-to-code implementation for Planet Education Networks with strong typing, reusable components, and polished loading/empty states.',
    longDescription: 'A meticulous translation of complex Figma designs into a fully functional React application. Built using Next.js and TypeScript, the project features a highly modular component architecture with comprehensive data modeling. Special attention was paid to creating a polished user experience with bespoke loading and empty states.',
    techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    category: ['Frontend'],
    thumbnailUrl: '/images/projects/vcad.svg',
    liveUrl: 'https://vcad-seven.vercel.app',
    githubUrl: 'https://github.com/mkmahmud/vcad',
    featured: false,
    order: 4,
  },
  {
    title: 'CloudSync Dashboard',
    slug: 'cloudsync-dashboard',
    projectType: 'project',
    description: 'Coming soon — project details will be added shortly.',
    techStack: ['React', 'TypeScript'],
    category: ['Frontend'],
    featured: false,
    order: 5,
  },
  {
    title: 'DevFlow CLI',
    slug: 'devflow-cli',
    projectType: 'project',
    description: 'Coming soon — project details will be added shortly.',
    techStack: ['Node.js', 'TypeScript'],
    category: ['Backend Tools'],
    featured: false,
    order: 6,
  }
];

async function seed() {
  if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI is not defined in environment variables');
    process.exit(1);
  }

  try {
    console.log('Connecting to database...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB.');

    console.log('Clearing existing projects...');
    await Project.deleteMany({});
    console.log('Cleared existing projects.');

    console.log('Inserting seed projects...');
    await Project.insertMany(seedProjects);
    console.log('Seed data inserted successfully!');

    console.log('Seeding complete.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
