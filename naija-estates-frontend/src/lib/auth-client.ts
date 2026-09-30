import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || process.env.BETTER_AUTH_URL || 'https://naijaspaces.app', // Explicit base URL for SSR and Next.js proxy
});
