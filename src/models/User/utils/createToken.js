import jwt from 'jsonwebtoken'
const secret = process.env.SECRET_KEY

export const createToken = (user) => {
  return jwt.sign({
    sub: user.id,
    username: user.username,
    email: user.email
  }, secret, {
    algorithm: 'HS256',
    expiresIn: '1h'
  })
}
