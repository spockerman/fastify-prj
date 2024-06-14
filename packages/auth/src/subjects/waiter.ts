import {z} from 'zod'

export const waiterSubject = z.tuple([
  z.union([
            z.literal('attend')
          , z.literal('bill')
          , z.literal('update')
        ]), 
        z.literal('Waiter')
])

export type WaiterSubject= z.infer<typeof waiterSubject>