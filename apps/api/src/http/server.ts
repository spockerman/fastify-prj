import { fastify } from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import fastifyJwt from '@fastify/jwt'

import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider
} from 'fastify-type-provider-zod'
import { createAccount } from './routes/auth/create-account';
import { authenticateWithPassword } from './routes/auth/authenticate-with-password';
import { getProfile } from './routes/auth/get-profile';
import { errorHandle } from './error-handler';
import { requestPasswordRecover } from './routes/auth/request-password-recover';
import { resetPassword } from './routes/auth/reset-password';
import { authenticateWithGithub } from './routes/auth/authenticate-with-github';
import { env } from '@saas/env';



const app = fastify().withTypeProvider<ZodTypeProvider>();
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})
app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)
app.setErrorHandler(errorHandle)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'allguestApi',
      description: 'Full-stack SaaS app to Pubs',
      version: '1.0.0',
    },
    components: {
      securitySchemes:{
        bearerAuth:{
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUI,{
  routePrefix:'/docs'
})


app.register(fastifyCors)
app.register(createAccount)
app.register(authenticateWithPassword)
app.register(getProfile)
app.register(requestPasswordRecover)
app.register(resetPassword)
app.register(authenticateWithGithub)

app.listen({port: env.SERVER_PORT}).then(() =>{
  console.log('HTTP server running')
})