// middleware desativado temporariamente para evitar bloqueios de rota

export async function middleware() {
  return Response.next();
}

export const config = {
  matcher: [],
};
