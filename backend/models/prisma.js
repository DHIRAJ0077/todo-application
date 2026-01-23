import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

if (process.env.NODE_ENV === 'development') {
  prisma.$on('query', (e) => console.log('Query:', e.query))
  prisma.$on('error', (e) => console.log('Error:', e.message))
}

export default prisma
