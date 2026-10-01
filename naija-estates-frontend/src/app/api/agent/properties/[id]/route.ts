import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'AGENT') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const resolvedParams = await params;
    const propertyId = resolvedParams.id;

    // Verify property ownership
    const existing = await prisma.property.findUnique({
      where: { id: propertyId }
    });

    if (!existing || existing.agentId !== session.userId) {
      return NextResponse.json({ error: 'Property not found or access denied' }, { status: 404 });
    }

    const data = await request.json();
    const images: string[] = Array.isArray(data.images) ? data.images.filter(Boolean) : [];

    // Delete existing property images if new images array provided
    if (images.length > 0) {
      await prisma.propertyImage.deleteMany({
        where: { propertyId }
      });
    }

    const updated = await prisma.property.update({
      where: { id: propertyId },
      data: {
        title: data.title ?? existing.title,
        description: data.description ?? existing.description,
        price: data.price ? parseFloat(data.price) : existing.price,
        type: data.type ?? existing.type,
        address: data.address ?? existing.address,
        city: data.city ?? existing.city,
        state: data.state ?? existing.state,
        imageUrl: data.imageUrl || (images.length > 0 ? images[0] : existing.imageUrl),
        rentalPeriod: data.rentalPeriod ?? existing.rentalPeriod,
        isAvailable: data.isAvailable !== undefined ? Boolean(data.isAvailable) : existing.isAvailable,
        images: images.length > 0 ? {
          create: images.map((url: string) => ({ url }))
        } : undefined
      },
      include: {
        images: true
      }
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating agent property:", error);
    return NextResponse.json({ error: "Failed to update property" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'AGENT') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const resolvedParams = await params;
    const propertyId = resolvedParams.id;

    // Verify ownership
    const existing = await prisma.property.findUnique({
      where: { id: propertyId }
    });

    if (!existing || existing.agentId !== session.userId) {
      return NextResponse.json({ error: 'Property not found or access denied' }, { status: 404 });
    }

    // Delete associated images & favourites first
    await prisma.propertyImage.deleteMany({ where: { propertyId } });
    await prisma.favourite.deleteMany({ where: { propertyId } });
    await prisma.review.deleteMany({ where: { propertyId } });

    await prisma.property.delete({
      where: { id: propertyId }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting property:", error);
    return NextResponse.json({ error: "Failed to delete property" }, { status: 500 });
  }
}
