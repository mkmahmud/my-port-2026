import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Project from '@/models/Project';
import { DEFAULT_PROJECTS } from '@/lib/constants';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category');

  try {
    if (!process.env.MONGODB_URI) {
      let filtered = DEFAULT_PROJECTS;
      if (category) {
        filtered = filtered.filter(p => p.category?.some(c => c.toLowerCase() === category.toLowerCase()));
      }
      return NextResponse.json(filtered, { status: 200, headers: { 'x-offline-mode': 'true' } });
    }
    
    await connectDB();
    
    let query = {};
    if (category) {
      query = { category: { $regex: new RegExp(category, 'i') } };
    }
    
    const projects = await Project.find(query)
      .sort({ order: 1, createdAt: -1 })
      .lean();
      
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Failed to fetch projects from DB, falling back to default projects:', error);
    let filtered = DEFAULT_PROJECTS;
    if (category) {
      filtered = filtered.filter(p => p.category?.some(c => c.toLowerCase() === category.toLowerCase()));
    }
    return NextResponse.json(filtered, { status: 200 });
  }
}
