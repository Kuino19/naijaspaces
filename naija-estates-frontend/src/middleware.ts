import { auth } from '@/lib/auth-config';

export default auth.middleware({ loginUrl: '/login' });

export const config = {
  matcher: ['/dashboard/:path*'],
};
