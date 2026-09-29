import { auth } from '@/lib/auth';

const handler = auth.handler();

export const GET: any = handler.GET;
export const POST: any = handler.POST;
