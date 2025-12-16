import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { connectToDatabase } from "@/lib/mongodb"
import User from "@/models/User"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null

        await connectToDatabase()

        // 🔍 Vérifie s'il y a un utilisateur admin
        const admin = await User.findOne({ role: "admin" })

        // 🟢 Aucun admin => autoriser login direct ET créer le premier admin
        if (!admin) {
          const hashedPassword = await bcrypt.hash(
            credentials.password as string,
            10
          )
          const newAdmin = new User({
            name: credentials.username as string,
            password: hashedPassword,
            role: "admin"
          })
          await newAdmin.save()
          return {
            id: newAdmin._id.toString(),
            name: newAdmin.name,
            role: newAdmin.role
          }
        }
        const isUsernameMatch = admin.name === credentials.username
        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          admin.password
        )

        if (isUsernameMatch && isPasswordValid) {
          return {
            id: admin._id.toString(),
            name: admin.name,
            role: admin.role
          }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: "/login"
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        ;(session.user as any).id = token.id
        ;(session.user as any).role = token.role
      }
      return session
    }
  }
})

