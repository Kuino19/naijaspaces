import { createAuthClient } from '@neondatabase/auth';
import { BetterAuthReactAdapter } from '@neondatabase/auth/react';

export const authClient = createAuthClient(
  process.env.NEXT_PUBLIC_NEON_AUTH_BASE_URL || 'https://ep-round-paper-b52a0xn7.neonauth.c-7.us-east-2.aws.neon.tech/neondb/auth',
  {
    adapter: BetterAuthReactAdapter(),
  }
);
