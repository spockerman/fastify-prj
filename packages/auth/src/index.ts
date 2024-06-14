import { createMongoAbility
          , CreateAbility
          , MongoAbility
          , AbilityBuilder } from '@casl/ability';
import { User } from './models/user';
import  {permissions}  from './permissions';

import { z } from 'zod';
import { costumerSubject } from './subjects/costumer';
import { waiterSubject } from './subjects/waiter';
import { managerSubject } from './subjects/manager';
import { userSubject } from './subjects/user';
import { establishmentSubject } from './subjects/establishment';

//type AppAbilities = CostumerSubject | WaiterSubject | ManagerSubject | ['manage', 'all']
const appAbilitiesSchema = z.union([
  costumerSubject,
  waiterSubject,
  managerSubject,
  userSubject,
  establishmentSubject,
  z.tuple([
    z.literal('manage'),
    z.literal('all')
  ])
])

type AppAbilities = z.infer<typeof appAbilitiesSchema>

export type AppAbility = MongoAbility<AppAbilities>;
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>;

export function defineAbilityFor(user: User){
  const builder = new AbilityBuilder(createAppAbility)

  if(typeof permissions[user.roles] !== 'function'){
    throw new Error(`Permissions for role ${user.roles} not found`)
  }
  permissions[user.roles](user, builder)

  const ability = builder.build()

  return ability

}