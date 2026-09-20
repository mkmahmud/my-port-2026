import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { slugify } from '@/lib/utils';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category');

  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        { error: 'MONGODB_URI environment variable is not defined' },
        { status: 503 }
      );
    }

    const db = await connectDB();

    let query: Record<string, unknown> = {};
    if (category) {
      const categoryRegex = new RegExp(category, 'i');
      query = {
        $or: [{ category: categoryRegex }, { projectCategory: categoryRegex }],
      };
    }

    const projects = await db
      .collection('projects')
      .find(query)
      .sort({ order: 1, createdAt: -1 })
      .toArray();

    const normalizedProjects = projects.map((project) => ({
      ...project,
      _id: project._id.toString(),
      slug: project.slug || slugify(project.title || project.projectTitle || String(project._id)),
    }));

    return NextResponse.json(normalizedProjects);
  } catch (error) {
    console.error('Failed to fetch projects from MongoDB:', error);
    return NextResponse.json(
      { error: 'Unable to fetch projects from MongoDB' },
      { status: 503 }
    );
  }
}
