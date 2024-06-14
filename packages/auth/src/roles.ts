import { z } from 'zod'

export const roleSchema = z.union([
    z.literal('ADMIN')
  , z.literal('WAITER')
  , z.literal('COSTUMER')
  , z.literal('OWNER')
])

export type Roles = z.infer<typeof roleSchema>