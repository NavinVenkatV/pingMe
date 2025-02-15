import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";
import {prisma} from "@/lib/prisma"



const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Email",
            credentials: {
                username: { label: "Email", placeholder: "email@gmail.com", type: "text" },
                password: { label: "Password", placeholder: "your password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials.password) {
                    return null;
                }
                const existingUser = await prisma.user.findFirst({
                    where: { email: credentials.username }
                });

                if (existingUser) {
                    const comparePassword = await bcrypt.compare(credentials.password, existingUser.password);
                    if (!comparePassword) return null;
                }

                if (!existingUser) {
                    const hashedPassword = await bcrypt.hash(credentials.password, 10);
                    const newUser = await prisma.user.create({
                        data: { email: credentials.username, password: hashedPassword }
                    });

                    return {
                        id: newUser.id.toString(),
                        name: newUser.email
                    };
                }

                return {
                    id: existingUser.id.toString(),
                    name: existingUser.email
                };
            }
        }),
        GoogleProvider({
            clientId: process.env.CLIENT_ID || "",
            clientSecret: process.env.CLIENT_SECRET || ""
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session, token }: { session: Session; token: JWT }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.image = token.picture as string;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async signIn({ user, account }) {
            if (account?.provider === "google" && user.email) {
                let existingUser = await prisma.user.findFirst({
                    where: { email: user.email }
                });
                if (!existingUser) {
                    existingUser = await prisma.user.create({
                        data: { email: user.email, password: "" }
                    });
                }
                user.id = existingUser.id.toString();
            }
            return true;
        }
    }
} as NextAuthOptions);

export { handler as GET, handler as POST };
