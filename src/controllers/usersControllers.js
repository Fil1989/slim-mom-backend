const { createUser, findByEmail, saveNotRecommendedInDb, findById } = require('../services/usersService')
const { loginAuth, logoutAuth } = require('../services/authService')
const { calculate, getSaveDayNorm } = require('../services/calcService')
const { fetchProducts } = require('../services/productsService')
const { getListProducts } = require('../assets')

const getDayNormKcal = async (req, res, next) => {
  const { groupBlood } = req.body

  try {
    const kcal = await calculate(req.body)
    const products = await fetchProducts()
    const productsNotRecommended = await getListProducts(products, groupBlood)

    return res.status(200).json({
      kcal,
      productsNotRecommended,
    })
  } catch (e) {
    next(e)
  }
}

const getSaveDayNormController = async (req, res, next) => {
  const { groupBlood } = req.body
  const { email } = req.user

  try {
    const kcal = await getSaveDayNorm(req.body, email)
    const products = await fetchProducts()
    const productsNotRecommended = await getListProducts(products, groupBlood)
    await saveNotRecommendedInDb(productsNotRecommended, email)
    res.status(200).json({ kcal, productsNotRecommended })
  } catch (e) {
    next(e)
  }
}

const signup = async (req, res, next) => {
  const user = await findByEmail(req.body)
  if (user) {
    return res.status(409).json({
      message: 'Email in use',
    })
  }
  try {
    const newUser = await createUser(req.body)

    const { name, email } = newUser

    return res.status(201).json({
      name,
      email,
    })
  } catch (e) {
    next(e)
  }
}

const login = async (req, res, next) => {
  try {
    const token = await loginAuth(req.body)
    if (!token) {
      return res.status(401).json({
        message: 'Email or password is wrong',
      })
    }

    const { name, email } = await findByEmail(req.body)

    return res.status(200).json({
      name,
      email,
      token,
    })
  } catch (e) {
    next(e)
  }
}

const logout = async (req, res, next) => {
  try {
    const { id } = req.user
    await logoutAuth(id)
    return res.status(204).json({})
  } catch (e) {
    next(e)
  }
}

const current = async (req, res, next) => {
  const { name, email, _id } = req.user
  try {
    const user = await findById(_id)

    if (user) {
      return res.status(200).json({ name, email })
    }
  } catch (e) {
    next(e)
  }
}

module.exports = {
  signup,
  login,
  logout,
  getDayNormKcal,
  getSaveDayNormController,
  current,
}
