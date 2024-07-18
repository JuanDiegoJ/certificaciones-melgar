import { DefaultSession } from "next-auth"

declare module 'next-auth' {
    interface Session {
        user: {
            id: string
            nombres: string
            apellidos: string
            email: string
            emailVerified?: boolean
            role: string
        } & DefaultSession['user']
    }
}