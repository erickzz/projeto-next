import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import {prisma} from "../database"
import bcrypt from 'bcrypt'

export const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
        clientId: process.env.GOOGLE_ID as string,
        clientSecret: process.env.GOOGLE_SECRET as string,
        allowDangerousEmailAccountLinking: true,
       }),
       GitHubProvider({
        clientId: process.env.GITHUB_ID as string,
        clientSecret: process.env.GITHUB_SECRET as string,
        allowDangerousEmailAccountLinking: true,

       }),
       CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {

            const user = await prisma.user.findFirst({
              where: {
                email: credentials?.email,
              },
            });
            if (!user || !credentials) {
              return null;
            }
            
            if ( user.password && !bcrypt.compareSync(credentials.password, user.password)) {
              return null;
            }
            return user;
        },
         }),
            
        ],
        session:{
            strategy: "jwt",
            maxAge: 30 * 24 * 60 * 60,
        },
        callbacks: {
            session: async ({ session, token }) => {
              if (session?.user) {
                session.user.id = token.sub as string;
              }
              return session;
            },
            jwt: async ({ user, token }) => {
              if (user) {
                token.uid = user.id;
              }
              return token;
            },
          },
  })