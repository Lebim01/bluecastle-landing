import payloadConfig from '@payload-config'
import { getPayload } from 'payload'
import { z } from 'zod'

export const runtime = 'nodejs' // usar Node (Local API no funciona en edge)

const ContactSchema = z.object({
  name: z.string().min(2),
  last_name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(5),
  source: z.string().optional(),
  utm: z
    .object({
      campaign: z.string().optional(),
      source: z.string().optional(),
      medium: z.string().optional(),
      term: z.string().optional(),
      content: z.string().optional(),
    })
    .optional(),
  _hp: z.string().optional(), // honeypot
  consent: z.boolean(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = ContactSchema.safeParse(body)
    if (!parsed.success) {
      return new Response(JSON.stringify({ ok: false, errors: parsed.error.flatten() }), {
        status: 400,
      })
    }

    // honeypot: si viene con contenido, rechazamos
    if (parsed.data._hp && parsed.data._hp.trim() !== '') {
      return new Response(JSON.stringify({ ok: true }), { status: 200 }) // finge éxito
    }

    if (!parsed.data.consent) {
      return new Response(
        JSON.stringify({ ok: false, message: 'Debes aceptar el consentimiento' }),
        { status: 400 },
      )
    }

    // Asegúrate de que Payload esté inicializado (si no usas next-payload)
    const payload = await getPayload({ config: payloadConfig })

    const doc = await payload.create({
      collection: 'contacts',
      data: parsed.data,
    })

    return new Response(JSON.stringify({ ok: true, id: doc.id }), { status: 201 })
  } catch (err: any) {
    console.error('CONTACT_POST_ERROR', err)
    return new Response(JSON.stringify({ ok: false, message: 'Error interno' }), { status: 500 })
  }
}
