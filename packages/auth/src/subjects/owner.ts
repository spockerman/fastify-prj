import {z} from 'zod'

export const ownerSubject = z.tuple([
  z.union([
            z.literal('attend')
          , z.literal('bill')
          , z.literal('delete')
          , z.literal('update')
          , z.literal('create')
        ]), 
        z.literal('owner')
])

export type OwnerSubject= z.infer<typeof ownerSubject>