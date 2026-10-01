import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
    }

    const [totalUsers, totalAgents, totalProperties, verifiedProperties, totalPayments, totalRevenue] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: 'AGENT' } }),
      prisma.property.count(),
      prisma.property.count({ where: { isVerified: true } }),
      prisma.payment.count(),
      prisma.payment.aggregate({
        where: { status: 'SUCCESS' },
        _sum: { amount: true }
      })
    ]);

    const recentProperties = await prisma.property.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        agent: { select: { name: true, email: true } }
      }
    });

    const recentUsers = await prisma.user.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, email: true, role: true, isVerified: true, createdAt: true }
    });

    return NextResponse.json({
      stats: {
        totalUsers,
        totalAgents,
        totalProperties,
        verifiedProperties,
        totalPayments,
        totalRevenue: totalRevenue._sum.amount || 0
      },
      recentProperties,
      recentUsers
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json({ error: "Failed to fetch admin stats" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
    }

    const { target, id, isVerified } = await request.json();

    if (target === 'property') {
      const updated = await prisma.property.update({
        where: { id },
        data: { isVerified: Boolean(isVerified) }
      });
      return NextResponse.json(updated);
    } else if (target === 'user') {
      const updated = await prisma.user.update({
        where: { id },
        data: { isVerified: Boolean(isVerified) }
      });
      return NextResponse.json(updated);
    }

    return NextResponse.json({ error: 'Invalid target type' }, { status: 400 });
  } catch (error) {
    console.error("Admin update error:", error);
    return NextResponse.json({ error: "Failed to update record" }, { status: 500 });
  }
}
