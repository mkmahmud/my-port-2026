import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Project from '@/models/Project';
import { DEFAULT_PROJECTS } from '@/lib/constants';

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  const { slug } = await context.params;

  try {
    if (!process.env.MONGODB_URI) {
      const fallback = DEFAULT_PROJECTS.find(p => p.slug === slug);
      if (fallback) {
        return NextResponse.json(fallback, { status: 200, headers: { 'x-offline-mode': 'true' } });
      }
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    
    await connectDB();
    
    const project = await Project.findOne({ slug }).lean();
    
    if (!project) {
      const fallback = DEFAULT_PROJECTS.find(p => p.slug === slug);
      if (fallback) {
        return NextResponse.json(fallback);
      }
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(project);
  } catch (error) {
    console.error('Failed to fetch project:', error);
    const fallback = DEFAULT_PROJECTS.find(p => p.slug === slug);
    if (fallback) {
      return NextResponse.json(fallback);
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
