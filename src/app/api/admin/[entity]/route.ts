import { NextRequest, NextResponse } from 'next/server';
import { checkIsAuthenticatedRequest } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { Profile } from '@/models/Profile';
import { Skill } from '@/models/Skill';
import { Education } from '@/models/Education';
import { Experience } from '@/models/Experience';
import { Project } from '@/models/Project';
import { SocialLink } from '@/models/SocialLink';
import { Contact } from '@/models/Contact';

// Helper to get model by entity string
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getModel(entity: string): any {
  switch (entity.toLowerCase()) {
    case 'profile':
      return Profile;
    case 'skills':
    case 'skill':
      return Skill;
    case 'education':
      return Education;
    case 'experience':
      return Experience;
    case 'projects':
    case 'project':
      return Project;
    case 'sociallinks':
    case 'sociallink':
    case 'socials':
      return SocialLink;
    case 'contact':
      return Contact;
    default:
      return null;
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ entity: string }> }
) {
  const isAuth = await checkIsAuthenticatedRequest(req);
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { entity } = await params;
  const Model = getModel(entity);
  if (!Model) {
    return NextResponse.json({ error: 'Invalid entity' }, { status: 400 });
  }

  try {
    await connectToDatabase();
    if (entity === 'profile' || entity === 'contact') {
      const doc = await Model.findOne().lean();
      return NextResponse.json({ data: doc });
    }
    const docs = await Model.find().sort({ order: 1, createdAt: -1 }).lean();
    return NextResponse.json({ data: docs });
  } catch (error) {
    console.error(`Admin GET error for ${entity}:`, error);
    return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ entity: string }> }
) {
  const isAuth = await checkIsAuthenticatedRequest(req);
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { entity } = await params;
  const Model = getModel(entity);
  if (!Model) {
    return NextResponse.json({ error: 'Invalid entity' }, { status: 400 });
  }

  try {
    await connectToDatabase();
    const body = await req.json();

    if (entity === 'profile' || entity === 'contact') {
      const updated = await Model.findOneAndUpdate({}, body, {
        upsert: true,
        returnDocument: 'after',
      });
      return NextResponse.json({ data: updated });
    }

    const created = await Model.create(body);
    return NextResponse.json({ data: created }, { status: 201 });
  } catch (error) {
    console.error(`Admin POST error for ${entity}:`, error);
    return NextResponse.json({ error: 'Save failed' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ entity: string }> }
) {
  const isAuth = await checkIsAuthenticatedRequest(req);
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { entity } = await params;
  const Model = getModel(entity);
  if (!Model) {
    return NextResponse.json({ error: 'Invalid entity' }, { status: 400 });
  }

  try {
    await connectToDatabase();
    const body = await req.json();
    const { _id, ...updateData } = body;

    if (!_id) {
      return NextResponse.json({ error: 'Document ID required for PUT' }, { status: 400 });
    }

    const updated = await Model.findByIdAndUpdate(_id, updateData, { returnDocument: 'after' });
    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error(`Admin PUT error for ${entity}:`, error);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ entity: string }> }
) {
  const isAuth = await checkIsAuthenticatedRequest(req);
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { entity } = await params;
  const Model = getModel(entity);
  if (!Model) {
    return NextResponse.json({ error: 'Invalid entity' }, { status: 400 });
  }

  try {
    await connectToDatabase();
    const id = req.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID parameter required for DELETE' }, { status: 400 });
    }

    await Model.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Admin DELETE error for ${entity}:`, error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
