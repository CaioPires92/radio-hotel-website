import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return Response.json({ ok: false, message: 'Invalid JSON' }, { status: 400 })
    }

    const { nome, email, telefone, mensagem, website } = body as Record<string, string>

    // Honeypot: if filled, silently accept
    if (website) return Response.json({ ok: true })

    if (!nome || !mensagem) {
      return Response.json({ ok: false, message: 'Missing required fields' }, { status: 400 })
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return Response.json({ ok: false, message: 'Invalid email' }, { status: 400 })
    }

    // Email service placeholder. Configure SMTP to enable sending.
    const hasEmailConfig = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && (process.env.CONTACT_TO || process.env.EMAIL_RESERVAS))
    if (!hasEmailConfig) {
      return Response.json({ ok: false, message: 'Email service not configured' }, { status: 501 })
    }

    // TODO: Implement actual email sending (e.g., Nodemailer) when allowed/installed.
    console.log('[CONTACT] New message:', { nome, email, telefone, mensagem })
    return Response.json({ ok: true, message: 'Accepted' }, { status: 202 })
  } catch {
    return Response.json({ ok: false, message: 'Server error' }, { status: 500 })
  }
}

