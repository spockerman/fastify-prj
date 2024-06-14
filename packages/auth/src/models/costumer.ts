import { z } from 'zod'

export const costumerSchema = z.object({
  costumerId: z.string()
})

export type Costumer = z.infer<typeof costumerSchema>