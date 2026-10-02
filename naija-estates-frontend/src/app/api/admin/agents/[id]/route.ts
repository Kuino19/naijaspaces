import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function PATCH(request: Request, context: any) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const id = context.params.id;
    const body = await request.json();

    if (typeof body.isVerified === 'boolean') {
      const updated = await prisma.user.update({
        where: { id },
        data: { isVerified: body.isVerified }
      });
      return NextResponse.json(updated);
    }
    
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  } catch (error) {
    console.error("Agent verify error:", error);
    return NextResponse.json({ error: "Failed to update agent" }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: any) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const id = context.params.id;

    // "Ban" by deleting the user completely, or maybe down-role them to TENANT
    await prisma.user.delete({
      where: { id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Agent ban error:", error);
    return NextResponse.json({ error: "Failed to ban agent" }, { status: 500 });
  }
}
