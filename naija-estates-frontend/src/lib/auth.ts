import { createNeonAuth } from '@neondatabase/auth/next/server';
import { prisma } from '@/lib/prisma';

export const auth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_BASE_URL || process.env.NEXT_PUBLIC_NEON_AUTH_BASE_URL || '',
  cookies: {
    secret: process.env.NEON_AUTH_COOKIE_SECRET || '',
  },
});

export const getSession = async () => {
  const { data: result } = await auth.getSession();
  if (!result || !result.user) return null;
  
  // Find or create the user in the application database
  let dbUser = await prisma.user.findUnique({
    where: { email: result.user.email },
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name || result.user.email.split('@')[0],
        password: "neon-auth-managed", // Placeholder, password managed by Neon
        role: "AGENT", // Default for new signups
      },
    });
  }

  return {
    userId: dbUser.id,
    email: dbUser.email,
    role: dbUser.role,
  };
};
