import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const favourites = await prisma.favourite.findMany({
      where: { userId: session.userId },
      include: {
        property: {
          include: {
            images: true,
            agent: {
              select: { id: true, name: true, isVerified: true }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(favourites);
  } catch (error) {
    console.error("Error fetching favourites:", error);
    return NextResponse.json({ error: "Failed to fetch favourites" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { propertyId } = await request.json();
    if (!propertyId) {
      return NextResponse.json({ error: 'Property ID required' }, { status: 400 });
    }

    const existing = await prisma.favourite.findUnique({
      where: {
        userId_propertyId: {
          userId: session.userId,
          propertyId
        }
      }
    });

    if (existing) {
      await prisma.favourite.delete({
        where: { id: existing.id }
      });
      return NextResponse.json({ favourited: false });
    } else {
      await prisma.favourite.create({
        data: {
          userId: session.userId,
          propertyId
        }
      });
      return NextResponse.json({ favourited: true });
    }
  } catch (error) {
    console.error("Error toggling favourite:", error);
    return NextResponse.json({ error: "Failed to update favourite" }, { status: 500 });
  }
}
