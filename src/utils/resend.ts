import { Resend } from 'resend'

export const { emails } = new Resend(process.env.RESEND_KEY)
