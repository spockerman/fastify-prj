import { costumerSchema } from '../models/costumer';
import {z} from 'zod'

export const costumerSubject = z.tuple([
  z.union([z.literal('create')
          , z.literal('pay')
          , z.literal('bill')
          , z.literal('attend')
          , z.literal('delete')
          , z.literal('update')
          , z.literal('consumer')
          , z.literal('block')
        ]), 
        z.union([z.literal('Costumer'), costumerSchema])
])

export type CostumerSubject= z.infer<typeof costumerSubject>