import {z} from 'zod'

export const userSubject = z.tuple([
  z.union([
            z.literal('attend')
          , z.literal('bill')
          , z.literal('delete')
          , z.literal('update')
          , z.literal('create')
        ]), 
        z.literal('user')
])

export type UserSubject= z.infer<typeof userSubject>