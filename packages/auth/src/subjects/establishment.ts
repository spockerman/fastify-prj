import {z} from 'zod'

export const establishmentSubject = z.tuple([
  z.union([
            z.literal('create')
          , z.literal('bill')
          , z.literal('delete')
          , z.literal('update')
        ]), 
        z.literal('Establishment')
])

export type EstablishmentSubject= z.infer<typeof establishmentSubject>