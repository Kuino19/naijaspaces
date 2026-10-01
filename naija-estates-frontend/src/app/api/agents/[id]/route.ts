import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const agent = await prisma.user.findUnique({
      where: { id: resolvedParams.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        whatsapp: true,
        avatarUrl: true,
        role: true,
        isVerified: true,
        createdAt: true,
        properties: {
          where: { isAvailable: true },
          include: {
            images: true
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    return NextResponse.json(agent);
  } catch (error) {
    console.error("Error fetching agent profile:", error);
    return NextResponse.json({ error: "Failed to fetch agent profile" }, { status: 500 });
  }
}
