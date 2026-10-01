import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const property = await prisma.property.findUnique({
      where: { id: resolvedParams.id },
      include: {
        agent: {
          select: { id: true, name: true, email: true, phone: true, whatsapp: true, avatarUrl: true, isVerified: true }
        },
        images: true,
        reviews: {
          include: {
            user: {
              select: { name: true, avatarUrl: true }
            }
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });
    
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }
    
    return NextResponse.json(property);
  } catch (error) {
    console.error("Error fetching property:", error);
    return NextResponse.json({ error: "Failed to fetch property" }, { status: 500 });
  }
}
