const jwt = require('jsonwebtoken')
require('dotenv').config()

const { updateToken, findByEmail } = require('./usersService')

const loginAuth = async ({ email, password }) => {
  const user = await findByEmail({ email })
  const validatedPassword = await user?.validatePassword(password)

  if (!user || !validatedPassword) {
    return null
  }

  const id = user.id
  const payload = { id }

  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '8h' })

  await updateToken(id, token)

  return token
}

const logoutAuth = async id => {
  return await updateToken(id, null)
}

module.exports = {
  loginAuth,
  logoutAuth,
}
