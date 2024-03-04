import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import {prisma} from "../database"

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
            if (!user) {
                return null;
            }
            if (user.password !== credentials?.password) {
                return null;
            }
            return user;
        },
         }),
            
        ],
        pages:{
            signIn: "/auth",
            signOut: "/auth",
            error: "/auth",
        },
  })