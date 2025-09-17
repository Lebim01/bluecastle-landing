import { PayloadRequest } from "payload"

// ------------------- Seed principal -------------------
export async function seed(req: PayloadRequest) {
  console.log('> Asegurando admins')

  await req.payload.create({
    collection: 'users',
    data: {
      email: 'admin@blue.com',
      password: '123987xd'
    }
  })

  console.log(`\nListo.`)
}
