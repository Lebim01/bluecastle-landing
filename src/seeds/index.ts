import { PayloadRequest } from 'payload'
import { seed as seedBlog } from './blog'
import { seed as seedAdmin } from './admin'

export const seed = async (req: PayloadRequest) => {
  console.log('🌱 Iniciando seed...')
  //await seedAdmin(req)
  await seedBlog(req)
  console.log('✅ Seed completado')
}
