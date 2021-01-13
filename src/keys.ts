export enum EnvironmentKey {
  DB_HOST = 'DB_HOST',
  DB_PORT = 'DB_PORT',
  DB_USERNAME = 'DB_USERNAME',
  DB_PASSWORD = 'DB_PASSWORD',
  DB_DATABASE = 'DB_DATABASE',
  NODE_ENV = 'NODE_ENV',
  JWT_SECRET = 'JWT_SECRET',
  JWT_EXPIRES_SECONDS = 'JWT_EXPIRES_SECONDS',
}

export enum EnvironmentName {
  PROD = 'production',
  DEV = 'development',
}

export enum Role {
  ADMIN = 'ADM',
  INVITE = 'INV',
}
