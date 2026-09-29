import { createNeonAuth } from '@neondatabase/auth/next/server';
import { prisma } from '@/lib/prisma';

export const auth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_BASE_URL || process.env.NEXT_PUBLIC_NEON_AUTH_BASE_URL || 'https://ep-round-paper-b52a0xn7.neonauth.c-7.us-east-2.aws.neon.tech/neondb/auth',
  cookies: {
    secret: process.env.NEON_AUTH_COOKIE_SECRET || 's3cur3c00k13s3cr3tf0rn30nauthv3ryr4nd0m',
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
