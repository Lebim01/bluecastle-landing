declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PAYLOAD_SECRET: string
      DATABASE_URI: string
      NEXT_PUBLIC_SERVER_URL: string
      VERCEL_PROJECT_PRODUCTION_URL: string
      NEXT_PUBLIC_STORAGE_URL: string
      GCS_BUCKET: string
      GCS_PROJECT_ID: string
      GCS_CLIENT_EMAIL: string
      GCS_PRIVATE_KEY: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { }
