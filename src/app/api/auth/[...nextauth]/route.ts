// import NextAuth from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: {},
//         password: {}
//       },
//       async authorize(credentials) {
//         if (
//           credentials?.email === "admin@admin.com" &&
//           credentials?.password === "123456"
//         ) {
//           return { id: "1", name: "Admin", email: "admin@admin.com" }
//         }
//         return null
//       }
//     })
//   ],
//   pages: {
//     signIn: "/login"
//   },
//   secret: process.env.NEXTAUTH_SECRET
// })

// export { handler as GET, handler as POST }
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {},
        password: {}
      },
      async authorize(credentials) {
        // ⚙️ Exemple simple (tu peux connecter ta DB ici)
        if (
          credentials?.username === "admin" &&
          credentials?.password === "password123"
        ) {
          return {
            id: "1",
            name: "Admin",
            email: "admin@strassshop.com",
            role: "admin"
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
  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }
