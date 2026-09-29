import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const properties = await prisma.property.findMany({
      include: {
        agent: {
          select: { name: true, email: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'AGENT') {
      return NextResponse.json({ error: 'Unauthorized. Only agents can list properties.' }, { status: 403 });
    }

    const data = await request.json();
    
    const newProperty = await prisma.property.create({
      data: {
        title: data.title,
        description: data.description,
        price: parseFloat(data.price),
        type: data.type,
        address: data.address,
        city: data.city,
        state: data.state,
        imageUrl: data.imageUrl || "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
        rentalPeriod: data.rentalPeriod || 'YEARLY',
        agentId: session.userId,
      },
    });

    return NextResponse.json(newProperty, { status: 201 });
  } catch (error) {
    console.error("Error creating property:", error);
    return NextResponse.json({ error: "Failed to create property" }, { status: 500 });
  }
}
