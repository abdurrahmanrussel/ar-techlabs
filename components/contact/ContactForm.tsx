'use client'

import { useActionState } from 'react'
import { sendContactEmail, ContactState } from '@/app/actions/contact'

const initialState: ContactState = { status: 'idle', message: '' }

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactEmail, initialState)

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Your name"
          className="w-full px-4 py-3 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="w-full px-4 py-3 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Describe your project or question..."
          className="w-full px-4 py-3 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
        />
      </div>

      {state.status !== 'idle' && (
        <div
          className={`px-4 py-3 rounded-lg text-sm font-medium ${
            state.status === 'success'
              ? 'bg-green-500/10 border border-green-500/30 text-green-400'
              : 'bg-red-500/10 border border-red-500/30 text-red-400'
          }`}
        >
          {state.message}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full py-3 rounded-lg bg-linear-to-r from-blue-500 to-purple-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
      >
        {pending ? 'Sending...' : 'Send Message →'}
      </button>
    </form>
  )
}
