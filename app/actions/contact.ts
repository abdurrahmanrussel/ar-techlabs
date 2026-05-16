'use server'

import { resend } from '@/lib/resend'

export type ContactState = {
  status: 'idle' | 'success' | 'error'
  message: string
}

export async function sendContactEmail(
  prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = formData.get('name')?.toString().trim()
  const email = formData.get('email')?.toString().trim()
  const message = formData.get('message')?.toString().trim()

  if (!name || !email || !message) {
    return { status: 'error', message: 'All fields are required.' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { status: 'error', message: 'Invalid email address.' }
  }

  if (message.length < 10) {
    return { status: 'error', message: 'Message must be at least 10 characters.' }
  }

  try {
    await resend.emails.send({
      from: 'AR TechLabs Contact <onboarding@resend.dev>',
      to: 'abdurrahmanrussel77@gmail.com',
      subject: `New message from ${name} — AR TechLabs`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0f1e;color:#f1f5f9;padding:32px;border-radius:8px;">
          <h2 style="color:#3b82f6;margin-top:0">New Contact from AR TechLabs</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}" style="color:#3b82f6">${email}</a></p>
          <hr style="border-color:#1e2a4a;margin:24px 0"/>
          <p style="white-space:pre-wrap">${message}</p>
        </div>
      `,
    })
    return { status: 'success', message: "Message sent! I'll get back to you soon." }
  } catch {
    return { status: 'error', message: 'Failed to send message. Please try again or email directly.' }
  }
}
