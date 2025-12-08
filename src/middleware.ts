import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Cookies do Supabase (manter esse nome!)
  const supabaseSession = request.cookies.get("sb-access-token")?.value;

  // Rotas públicas
  const publicRoutes = ["/login", "/auth/callback"];

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Se NÃO tem sessão → bloqueia rota protegida
  if (!supabaseSession && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Se tem sessão → impede acessar /login
  if (supabaseSession && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Quais rotas o middleware controla
export const config = {
  matcher: ["/((?!_next|favicon.ico|api|lasy-bridge.js|icon.svg).*)"],
};
