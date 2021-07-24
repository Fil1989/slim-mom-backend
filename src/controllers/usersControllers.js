const { createUser, findByEmail, saveNotRecommendedInDb } = require('../services/usersService')
const { loginAuth, logoutAuth } = require('../services/authService')
const { calculate, getSaveDayNorm } = require('../services/calcService')
const { fetchProducts } = require('../services/productsService')

const getDayNormKcal = async (req, res, next) => {
  const { groupBlood } = req.body
  try {
    const kcal = await calculate(req.body)
    const products = await fetchProducts()

    const productsNotRecommended = products
      .filter((el, _, arr) => {
        if (el.groupBloodNotAllowed[groupBlood]) return arr
      })
      .flatMap(el => el.categories)
      .reduce((acc, el, ind, arr) => {
        arr.indexOf(el) === ind ? acc.push(el) : acc
        return acc
      }, [])

    return res.status(200).json({
      message: 'success',
      data: { kcal, productsNotRecommended },
    })
  } catch (e) {
    next(e)
  }
}

const getSaveDayNormController = async (req, res, next) => {
  const { groupBlood } = req.body
  const { email } = req.user

  try {
    const dailyNorm = await getSaveDayNorm(req.body, email)

    const products = await fetchProducts()
    const productsNotRecommended = products
      .filter((el, _, arr) => {
        if (el.groupBloodNotAllowed[groupBlood]) return arr
      })
      .flatMap(el => el.categories)
      .reduce((acc, el, ind, arr) => {
        arr.indexOf(el) === ind ? acc.push(el) : acc
        return acc
      }, [])
    await saveNotRecommendedInDb(productsNotRecommended, email)
    res.status(200).json({ message: 'success', dailyNorm, productsNotRecommended })
  } catch (error) {
    next(error)
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

    const { email } = newUser

    return res.status(201).json({
      message: 'success',
      user: { email },
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

    const { email } = await findByEmail(req.body)

    return res.status(200).json({
      status: 'success',
      token,
      user: { email },
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

module.exports = {
  signup,
  login,
  logout,
  getDayNormKcal,
  getSaveDayNormController,
}
