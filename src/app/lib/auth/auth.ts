import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/db/DB";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                password: { label: "Password", type: "password", required: true },
                name: { label: "email", type: "email", required: true },
                email: { label: "name", type: "name", required: true },
            },
            async authorize(credentials: any) {
                const existingUser = await db.user.findFirst({
                    where: {
                        email: credentials.email,
                    }
                });

                if (existingUser && existingUser.name && existingUser.email && existingUser.password) {
                    const passwordValidation = credentials.password == existingUser.password
                    if (passwordValidation) {
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.email
                        }
                    }
                    return null;
                }


                try {
                    const user = await db.user.create({
                        data: {
                            email: credentials.email,
                            name: credentials.name,
                            password: credentials.password
                        }
                    });

                    return {
                        id: user.id.toString(),

                        name: user.name,
                        email: user.email
                    }
                } catch (e) {
                    console.error(e);
                }

                return null
            },
        }),
    ],
    secret: process.env.JWT_SECRET || "secret",

    callbacks: {
        async jwt({ token, user }) {
            if (user) token.id = user.id;
            return token;
        },
        async session({ session, token }) {
            //@ts-ignore
            if (session.user) session.user.id = token.id;
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
};
