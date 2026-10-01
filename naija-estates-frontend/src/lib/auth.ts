import { prisma } from '@/lib/prisma';
export { auth } from './auth-config';
import { auth } from './auth-config';

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
        password: "neon-auth-managed",
        role: "AGENT",
      },
    });
  }

  return {
    userId: dbUser.id,
    email: dbUser.email,
    role: dbUser.role,
  };
};
