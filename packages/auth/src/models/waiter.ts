import { z } from 'zod'

export const waiterSchema = z.object({
  waiterId: z.string()
})

export type Waiter = z.infer<typeof waiterSchema>