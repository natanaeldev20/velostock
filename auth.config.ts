import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { loginSchema } from './modules/auth/schema/login.schema'
import prisma from './shared/infrastructure/database/db'
import bcrypt from 'bcryptjs'

export default {
  trustHost: true,
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const result = loginSchema.safeParse(credentials)

        if (!result.success) return null

        const { username, password } = result.data

        const user = await prisma.user.findFirst({
          where: {
            username: username.toLowerCase().trim(),
            isActive: true,
            deletedAt: null
          }
        })

        if (!user || !user.password) return null

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) return null

        return {
          id: user.id,
          name: `${user.name} ${user.lastName}`,
          image: user.imgUrl
        }
      }
    })
  ],
  secret: process.env.AUTH_SECRET
} satisfies NextAuthConfig
