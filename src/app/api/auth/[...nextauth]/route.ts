import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        cpf: { label: "Cpf", type: "text", placeholder: "CPF" },
        password: { label: "Password", type: "password", placeholder: "Password" }
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
            where: {
                cpf: credentials?.cpf
            }
        })

        if(user && credentials) {
          const check = await bcrypt.compare(credentials.password, user.password);
          const { password, ...result } = user
          if(check) return result
        }

        return null;
      }
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    //   profile(profile) {
    //     return {
    //       id: profile.id,
    //       email: profile.email,
    //       name: profile.name,
    //       image: profile.picture,
    //       cpf: null, // Inicialmente definimos como nulo
    //     };
    //   },
    // }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/"
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;

      return session;
    }
  }
})

export { handler as GET, handler as POST }