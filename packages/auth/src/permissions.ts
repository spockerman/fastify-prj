import { AbilityBuilder } from "@casl/ability";
import { AppAbility } from ".";
import { User } from "./models/user";
import { Roles } from "./roles";


type PermissionsByRole = (user: User, builder: AbilityBuilder<AppAbility>) => void;


export const permissions: Record<Roles,PermissionsByRole> = {
  ADMIN(_,{can}) {
    can('manage', 'all')
  },
  OWNER(user,{can, cannot}) {
    can('manage', 'all')
    cannot(['update', 'delete'], 'Costumer', {costumerId:{$eq: user.id}})
  },
  COSTUMER(user, {can}){
    can(['update', 'delete'], 'Costumer', {costumerId:{$eq: user.id}}),
    can(['consumer', 'pay'],'Costumer')
  },
  WAITER(user,{can}){
    can('update', 'Waiter', {waiterId: {$eq: user.id}})
    can(['bill', 'attend'], 'Costumer')
    
  }
}