import { createNeonAuth } from '@neondatabase/auth/next/server';

export const auth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_BASE_URL || process.env.NEXT_PUBLIC_NEON_AUTH_BASE_URL || 'https://ep-round-paper-b52a0xn7.neonauth.c-7.us-east-2.aws.neon.tech/neondb/auth',
  cookies: {
    secret: process.env.NEON_AUTH_COOKIE_SECRET || 's3cur3c00k13s3cr3tf0rn30nauthv3ryr4nd0m',
  },
});
