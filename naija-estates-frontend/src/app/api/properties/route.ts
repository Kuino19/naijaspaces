import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const type = searchParams.get('type');
    const state = searchParams.get('state');
    const city = searchParams.get('city');
    const rentalPeriod = searchParams.get('rentalPeriod');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const isVerified = searchParams.get('isVerified');

    const where: any = { isAvailable: true };

    if (type && type !== 'all') {
      where.type = type.toUpperCase();
    }
    if (rentalPeriod && rentalPeriod !== 'all') {
      where.rentalPeriod = rentalPeriod.toUpperCase();
    }
    if (state && state !== 'all') {
      where.state = { contains: state, mode: 'insensitive' };
    }
    if (city && city !== 'all') {
      where.city = { contains: city, mode: 'insensitive' };
    }
    if (isVerified === 'true') {
      where.isVerified = true;
    }
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
        { state: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } },
      ];
    }

    const properties = await prisma.property.findMany({
      where,
      include: {
        agent: {
          select: { id: true, name: true, email: true, phone: true, whatsapp: true, avatarUrl: true, isVerified: true }
        },
        images: true,
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
    const images: string[] = Array.isArray(data.images) ? data.images.filter(Boolean) : [];
    const primaryImage = data.imageUrl || images[0] || "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80";

    const newProperty = await prisma.property.create({
      data: {
        title: data.title,
        description: data.description,
        price: parseFloat(data.price),
        type: data.type,
        address: data.address,
        city: data.city,
        state: data.state,
        imageUrl: primaryImage,
        rentalPeriod: data.rentalPeriod || 'YEARLY',
        isVerified: data.isVerified ?? false,
        agentId: session.userId,
        images: {
          create: images.map((url: string) => ({ url }))
        }
      },
      include: {
        images: true,
        agent: {
          select: { id: true, name: true, email: true, phone: true, whatsapp: true, avatarUrl: true, isVerified: true }
        }
      }
    });

    return NextResponse.json(newProperty, { status: 201 });
  } catch (error) {
    console.error("Error creating property:", error);
    return NextResponse.json({ error: "Failed to create property" }, { status: 500 });
  }
}
