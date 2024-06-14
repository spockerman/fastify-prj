import { prisma } from '@/lib/prisma';
import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function send(){
  await prisma.order.deleteMany()
  await prisma.user.deleteMany()
  await prisma.establishment.deleteMany()
  await prisma.menuItem.deleteMany()
  await prisma.menu.deleteMany()

  const passwordHash = await hash('Password@123', 1)
  const user = await prisma.user.create({
    data:{
      name: 'Sandro Campos',
      email: 'campos.sandro@gmail.com',
      avatarUrl: 'https://github.com/spockerman.png',
      passwordHash,
      role:'ADMIN'
    }
})

const user2 = await prisma.user.create({
  data:{
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.image.avatarGitHub(),
      passwordHash,
      role:'WAITER'
  }
})

const user3 = await prisma.user.create({
  data:{
    name: faker.person.fullName(),
    email: faker.internet.email(),
    avatarUrl: faker.image.avatarGitHub(),
    passwordHash, 
    role: 'COSTUMER'
  }
})
  
  const pub = await prisma.establishment.create({
    data:{
      name: 'Acme Inc',
      avatarUrl: faker.image.avatarGitHub(),
      slug: 'acme-admin',
      employees:{
        createMany:{
          data:[
            {
              userId: user.id
            },
            {
              userId: user2.id
            }
          ]
        }
      }
    }
  })

  await prisma.session.create({
    data:{
        establishmentId: pub.id,
        userId: user3.id
    }
  })

  const menuFood  = await prisma.menu.create({
    data:{
      name: 'menu food',
      type: 'FOOD',
      establishmentId: pub.id
    }
  })

  const menuDrink  = await prisma.menu.create({
    data:{
      name: 'menu drink',
      type:'DRINK',
      establishmentId: pub.id
    }
  })

  const heineken = await prisma.menuItem.create({
    data:{
      name: 'Heineken',
      avatarUrl: faker.image.avatarGitHub(),
      description: 'Cerveja Heineken',
      price: 15.00,
      types: 'BEER'
    }
  })

  const guarana = await prisma.menuItem.create({
    data:{
      name: 'Garana Antartica',
      avatarUrl: faker.image.avatarGitHub(),
      description: 'Garana Antartica',
      price: 9.00,
      types:'SODA'

    }
  })
  const agua = await prisma.menuItem.create({
    data:{
      name: 'Agua com gas',
      avatarUrl: faker.image.avatarGitHub(),
      description: 'Agua com gas',
      price: 5.00,
      types: 'WATER'
    }
  })
  const batata = await prisma.menuItem.create({
    data:{
      name: 'Batata frita',
      avatarUrl: faker.image.avatarGitHub(),
      description: 'Batata frita',
      price: 25.00,
      types: 'SNACKS'
    }
  })
  

  await prisma.menuMenuItem.createMany({
    data:[{
      menuId: menuDrink.id,
      menuItemId: heineken.id
    },
    {
      menuId: menuDrink.id,
      menuItemId: guarana.id
    },
    {
      menuId: menuDrink.id,
      menuItemId: agua.id
    }, 
    {
      menuId: menuFood.id,
      menuItemId: batata.id, 
    }
  ]
  })

}

send().then(()=>{
  console.log('Database seeded!')
})