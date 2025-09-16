import { BasePayload, PayloadRequest } from 'payload'
import { seed as seedBlog } from './blog'

export const seed = async (req: PayloadRequest) => {
  console.log('🌱 Iniciando seed...')
  await seedBlog(req)
  console.log('✅ Seed completado')
}
