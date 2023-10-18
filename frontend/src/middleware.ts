import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { SECRET } from '@/lib/config';

export async function middleware({ cookies, url }: NextRequest) {
	const token = cookies.get('authenticate');

	if (token) {
		try {
			const textEncode = new TextEncoder().encode(SECRET)
			await jwtVerify(token.value, textEncode);
		} catch {
			cookies.delete('authenticate');
			return NextResponse.redirect(new URL('/login', url));
		}
	}

	return NextResponse.next();
}
