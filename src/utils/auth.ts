//claude 11/4
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { JWT } from "next-auth/jwt"

export const {
  handlers,
  signIn,
  signOut,
  auth
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (session.user && token) {
        session.user.id = token.id
        session.user.username = token.username || session.user.name;
        // Split the name into first and last names
        const [firstName, ...lastNameArr] = session.user.name?.split(" ") || []
        session.user.firstName = firstName
        session.user.lastName = lastNameArr.join(" ")
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.JWT_SECRET,

})