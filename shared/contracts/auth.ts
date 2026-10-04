import { z } from 'zod'

// Sign-up request. The form and the server both validate with this schema.
export const RegisterSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
})

export type Register = z.infer<typeof RegisterSchema>
