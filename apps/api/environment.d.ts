
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      OAUTH_GITHUB_URL: string;
      OAUTH_GITHUB_ACCESS_TOKEN: string;
      OAUTH_GITHUB_CLIENTID: string;
      OAUTH_GITHUB_REDIRECT_URL: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}