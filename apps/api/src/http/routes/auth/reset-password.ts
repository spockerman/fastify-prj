import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod'
import { prisma } from "../lib/prisma";
import { UnauthorizedError } from "../_errors/unauthorized-error";
import { hash } from "bcryptjs";


export async function resetPassword(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>()
  .post('/password/reset', {
    schema:{
      tags: ['auth'],
      summary: 'Reset a password',
      body: z.object({
            code: z.string(),
            password: z.string().min(6)
      }),
        response:{
          204: z.null(),
          }
        }
    },
    async(request, reply) =>{
      const {code, password} = request.body

      const tokenForCode = await prisma.token.findUnique({
        where: {id: code}
      })

      if(!tokenForCode){
        throw new UnauthorizedError()
      }
      const passwordHash = await hash(password, 6)

      await prisma.user.update({
        where: {
          id: tokenForCode.userId
        },
        data: {
          passwordHash,
        }
      })
      return reply.status(204).send()
  })
 
}