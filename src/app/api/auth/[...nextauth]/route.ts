// // import NextAuth from "next-auth"
// // import CredentialsProvider from "next-auth/providers/credentials"

// // const handler = NextAuth({
// //   providers: [
// //     CredentialsProvider({
// //       name: "Credentials",
// //       credentials: {
// //         username: {},
// //         password: {}
// //       },
// //       async authorize(credentials) {
// //         // ⚙️ Exemple simple (tu peux connecter ta DB ici)
// //         if (
// //           credentials?.username === "admin" &&
// //           credentials?.password === "password123"
// //         ) {
// //           return {
// //             id: "1",
// //             name: "Admin",
// //             email: "admin@strassshop.com",
// //             role: "admin"
// //           }
// //         }
// //         return null
// //       }
// //     })
// //   ],
// //   pages: {
// //     signIn: "/login"
// //   },
// //   session: {
// //     strategy: "jwt"
// //   },
// //   secret: process.env.NEXTAUTH_SECRET
// // })

// // export { handler as GET, handler as POST }

// import NextAuth from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"
// import bcrypt from "bcryptjs"
// import { connectToDatabase } from "@/lib/mongodb"
// import User from "@/models/User"

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         if (!credentials?.username || !credentials?.password) return null

//         await connectToDatabase()

//         // 🔍 Vérifie s’il y a un utilisateur admin dans la DB
//         const admin = await User.findOne({ role: "admin" })

//         // 🟢 Si aucun admin n’existe encore => on autorise le login par défaut
//         if (!admin) {
//           return {
//             id: "1",
//             name: credentials.username,
//             role: "admin"
//           }
//         }

//         // 🔐 Si un admin existe, on vérifie les identifiants
//         const isUsernameMatch = admin.name === credentials.username

//         const isPasswordValid = await bcrypt.compare(
//           credentials.password,
//           admin.password
//         )

//         if (isUsernameMatch && isPasswordValid) {
//           return {
//             id: admin._id.toString(),
//             name: admin.name,
//             role: admin.role
//           }
//         }

//         return null
//       }
//     })
//   ],
//   pages: {
//     signIn: "/login"
//   },
//   session: {
//     strategy: "jwt"
//   },
//   secret: process.env.NEXTAUTH_SECRET
// })

// export { handler as GET, handler as POST }

import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { connectToDatabase } from "@/lib/mongodb"
import User from "@/models/User"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null

        await connectToDatabase()

        // 🔍 Vérifie s’il y a un utilisateur admin
        const admin = await User.findOne({ role: "admin" })

        // 🟢 Aucun admin => autoriser login direct ET créer le premier admin
        if (!admin) {
          const hashedPassword = await bcrypt.hash(credentials.password, 10)
          const newAdmin = new User({
            name: credentials.username,
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
          credentials.password,
          admin.password
        )
        console.log(isPasswordValid)
        console.log(credentials.password)
        console.log(isPasswordValid)
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
  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }
