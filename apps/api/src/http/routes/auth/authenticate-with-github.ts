import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod'
import { BadRequestError } from "../_errors/bad-request-error";
import { prisma } from "../lib/prisma";
import { env } from "@saas/env";


export async function authenticateWithGithub(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/sessions/github', {
    schema:{
      tags: ['auth'],
      summary: 'Authenticate with github account',
      body: z.object({
        code: z.string()
      }), 
        response:{
          201: z.object({
            token: z.string()
          })
        }
    },
  }, async(request, reply) =>{
    const { code } = request.body
    const gitHubURL = new URL(env.OAUTH_GITHUB_ACCESS_TOKEN)
   
    gitHubURL.searchParams.set('client_id', env.OAUTH_GITHUB_CLIENTID)
    gitHubURL.searchParams.set('client_secret', env.OAUTH_GITHUB_CLIENT_SECRET)
    gitHubURL.searchParams.set('redirect_uri', env.OAUTH_GITHUB_REDIRECT_URI)
    gitHubURL.searchParams.set('code', code)

    const gitHubAccessTokenResponse = await fetch(gitHubURL, {
      method: 'POST',
      headers:{
        Accept: 'application/json'
      }
    })  

    const gitHubAccessTokenData = await gitHubAccessTokenResponse.json()
    //console.log(gitHubAccessTokenData)

    const {access_token: gitHubAccessToken} = z
        .object({
          access_token: z.string(),
          token_type: z.literal('bearer'),
          scope: z.string()
        }).parse(gitHubAccessTokenData)
    const githubUserResponse = await fetch(env.OAUTH_GITHUB_USER_URI, {
      headers:{
        Authorization: `Bearer ${gitHubAccessToken}` 
      }
    })
    const gitHubUserData = await githubUserResponse.json()
    
    const {
      id: gitHubId,
      name,
      email,
      avatar_url: avatarUrl
    } = z.object({
      id: z.number().int().transform(String),
      avatar_url: z.string().url(),
      name: z.string().nullable(),
      email: z.string().nullable()
    }).parse(gitHubUserData)

    if(email === null){
      throw new BadRequestError('You GitHub account must have an email to authentication')
    }

    let user = await prisma.user.findUnique({
      where: { email }
    })

    if (name) {
      user = await prisma.user.create({
        data:{
          name,
          email,
          avatarUrl
        }
      })
    } else {
      throw new Error("Name cannot be null");
    }

    let account = await prisma.account.findUnique({
      where: {
        provider_userId:{
          provider: 'GITHUB',
          userId: user.id
        }
      }
    })

    if( !account ){
      account = await prisma.account.create({
        data:{
          provider: 'GITHUB',
          providerAccountId: gitHubId,
          userId: user.id
        }
      })
    }

    const token = await reply.jwtSign(
      {
        sub: user.id
      }
      ,{
        sign:{
          expiresIn:'30d'
        }
      }
    )
    return reply.status(201).send({ token });

  })
  
}

