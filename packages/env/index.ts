import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server:{
    SERVER_PORT: z.coerce.number().default(3333),
    DATABASE_URL: z.string().url(),
    JWT_SECRET: z.string(),
    OAUTH_GITHUB_CLIENTID: z.string(),
    OAUTH_GITHUB_CLIENT_SECRET: z.string(),
    OAUTH_GITHUB_REDIRECT_URI: z.string().url(),
    OAUTH_GITHUB_URL: z.string().url(),
    OAUTH_GITHUB_ACCESS_TOKEN: z.string().url(),
    OAUTH_GITHUB_USER_URI: z.string().url()


  },
  client:{},
  shared:{},
  runtimeEnv:{
    SERVER_PORT: process.env.SERVER_PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    OAUTH_GITHUB_CLIENTID: process.env.OAUTH_GITHUB_CLIENTID,
    OAUTH_GITHUB_CLIENT_SECRET: process.env.OAUTH_GITHUB_CLIENT_SECRET,
    OAUTH_GITHUB_REDIRECT_URI: process.env.OAUTH_GITHUB_REDIRECT_URI,
    OAUTH_GITHUB_URL: process.env.OAUTH_GITHUB_URL,
    OAUTH_GITHUB_ACCESS_TOKEN: process.env.OAUTH_GITHUB_ACCESS_TOKEN,
    OAUTH_GITHUB_USER_URI: process.env.OAUTH_GITHUB_USER_URI
  },
  emptyStringAsUndefined:true
})