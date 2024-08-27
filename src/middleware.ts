export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",
    "/compartimentos/:path*",
    "/equipamentos/:path*",
    "/utilizadores/:path*",
  ],
};
