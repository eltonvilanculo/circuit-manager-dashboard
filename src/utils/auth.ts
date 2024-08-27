import NextAuth from "next-auth";


import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const res = await fetch("http://localhost:3000/api/signin", {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          });
          const response = await res.json();

          if (res.ok && response.user) {
            return response.user;
          } else {
            throw new Error("Invalid credentials");
          }
        } catch (error) {
          console.log("🚀 ~ authorize ~ error:", error);
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  debug: true,

  callbacks: {
    async session({ session, token }: any) {
      if (session & session.user) {
        const user = session.user;
        console.log("🚀 ~ session ~ session:", session);
        session.id = user.id;
        session.type = user.type;
        session.user.test = token.test as string;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.test = "sdhshhdshdh";
      }

      return token;
    },
  },
});
export { handler as GET, handler as POST, handler as auth };
