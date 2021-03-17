import path from 'path'
import * as dotenv from 'dotenv'

const ENV = process.env.NODE_ENV || 'development'

let envFile = '.env.prod'
if (ENV === 'test') {
  envFile = '.env.test'
} else if (ENV === 'development') {
  envFile = '.env.dev'
}

dotenv.config({ path: path.join(__dirname, '..', envFile) })

export default {
  ENV,
  PORT: process.env.PORT || 3001,
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
  FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
}
