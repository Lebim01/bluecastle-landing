'use client'
import * as React from 'react'

type State = { loading: boolean; success?: boolean; error?: string }

export default function ContactForm({ className = '' }: { className?: string }) {
  const [state, setState] = React.useState<State>({ loading: false })

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    setState({ loading: true })

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone || undefined,
          last_name: data.last_name,
          message: data.message,
          source: data.source || 'website',
          utm: {
            campaign: data['utm.campaign'] || undefined,
            source: data['utm.source'] || undefined,
            medium: data['utm.medium'] || undefined,
            term: data['utm.term'] || undefined,
            content: data['utm.content'] || undefined,
          },
          _hp: data._hp || '',
          consent: data.consent === 'on',
        }),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) throw new Error(json.message || 'No se pudo enviar')

      setState({ loading: false, success: true })
      form.reset()
    } catch (err: any) {
      setState({ loading: false, error: err.message || 'Error al enviar' })
    }
  }

  return (
    <form onSubmit={onSubmit} className={`space-y-4 ${className}`}>
      {/* honeypot */}
      <input type="text" name="_hp" tabIndex={-1} autoComplete="off" className="hidden" />

      <div>
        <label className="block text-sm font-medium">Name</label>
        <input name="name" required className="mt-1 w-full rounded-md border px-3 py-2" />
      </div>

      <div>
        <label className="block text-sm font-medium">Last Name</label>
        <input name="last_name" required className="mt-1 w-full rounded-md border px-3 py-2" />
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-md border px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Phone</label>
        <input name="phone" className="mt-1 w-full rounded-md border px-3 py-2" />
      </div>

      <div>
        <label className="block text-sm font-medium">Message</label>
        <textarea
          name="message"
          required
          rows={5}
          className="mt-1 w-full rounded-md border px-3 py-2"
        />
      </div>

      {/* UTM opcional */}
      <details className="text-sm hidden">
        <summary className="cursor-pointer select-none">Parámetros UTM (opcional)</summary>
        <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
          <input
            name="utm.campaign"
            placeholder="utm_campaign"
            className="rounded-md border px-3 py-2"
          />
          <input
            name="utm.source"
            placeholder="utm_source"
            className="rounded-md border px-3 py-2"
          />
          <input
            name="utm.medium"
            placeholder="utm_medium"
            className="rounded-md border px-3 py-2"
          />
          <input name="utm.term" placeholder="utm_term" className="rounded-md border px-3 py-2" />
          <input
            name="utm.content"
            placeholder="utm_content"
            className="rounded-md border px-3 py-2"
          />
        </div>
      </details>

      <div className="flex items-center gap-2">
        <input id="consent" name="consent" type="checkbox" className="h-4 w-4" />
        <label htmlFor="consent" className="text-sm">
          I accept our privacy policy privacy policy
        </label>
      </div>

      <button
        type="submit"
        disabled={state.loading}
        className="rounded-lg border px-4 py-2 font-medium hover:bg-gray-50 disabled:opacity-60"
      >
        {state.loading ? 'Enviando…' : 'Enviar'}
      </button>

      {state.success && (
        <p className="text-green-600 text-sm">Thanks! Your message was sent correctly.</p>
      )}
      {state.error && <p className="text-red-600 text-sm">{state.error}</p>}
    </form>
  )
}
