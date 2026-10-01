import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Please log in to submit a review' }, { status: 401 });
    }

    const resolvedParams = await params;
    const propertyId = resolvedParams.id;
    const { rating, comment } = await request.json();

    if (!rating || rating < 1 || rating > 5 || !comment) {
      return NextResponse.json({ error: 'Rating (1-5) and comment are required' }, { status: 400 });
    }

    const newReview = await prisma.review.create({
      data: {
        rating: parseInt(rating),
        comment,
        propertyId,
        userId: session.userId,
      },
      include: {
        user: {
          select: { name: true, avatarUrl: true }
        }
      }
    });

    // Update property average rating
    const allReviews = await prisma.review.findMany({
      where: { propertyId }
    });
    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

    await prisma.property.update({
      where: { id: propertyId },
      data: { rating: parseFloat(avgRating.toFixed(1)) }
    });

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error("Error submitting review:", error);
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
  }
}
