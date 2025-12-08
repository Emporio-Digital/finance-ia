import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('sb-access-token')?.value;

  const isLogged = Boolean(authCookie);

  const publicRoutes = ['/login', '/auth/callback'];
  const isPublic = publicRoutes.some(r =>
    request.nextUrl.pathname.startsWith(r)
  );

  // Se não está logado e tenta entrar em rota privada → mandar para login
  if (!isLogged && !isPublic) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Se está logado e tenta ir para login → mandar para dashboard
  if (isLogged && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|lasy-bridge.js|icon.svg).*)'],
};
