import NextAuth from "next-auth";

export declare module "next-auth" {
    interface Session {
        user: {
            id: string,
            image: string,
            name: string,
            accessToken: string
        }
    }
}