export const SESSION_COOKIE_NAME = 'session'
export const SESSION_COOKIE_MAX_AGE = 14 * 24 * 60 * 60 // 2 weeks in seconds
export const JWT_EXPIRATION_TIME = SESSION_COOKIE_MAX_AGE * 1000 // Convert to milliseconds for JWT expiration
export const JWT_ALGORITHM = 'HS256'
export const JWT_KEY = new TextEncoder().encode(process.env.SESSION_SECRET)
