const { fetchProducts, addProduct, removeProduct, getProductsByDay } = require('../services/productsService')

const { getListFoundProducts } = require('../assets')
const { getRemain, getKcalPerDay } = require('../services/calcService')

const search = async (req, res, next) => {
  const { product } = req.query
  const normalizedQuery = product.toLowerCase()

  try {
    const products = await fetchProducts()
    const foundProducts = await getListFoundProducts(products, normalizedQuery)

    return res.status(200).json(foundProducts)
  } catch (e) {
    next(e)
  }
}

const add = async (req, res, next) => {
  const { id } = req.user
  try {
    const product = await addProduct(id, req.body)
    const { _id, date, kcal, weight, title, owner } = product
    return res.status(201).json({
      id: _id,
      date,
      kcal,
      weight,
      title,
      owner,
    })
  } catch (e) {
    next(e)
  }
}

const remove = async (req, res, next) => {
  const { id } = req.user
  try {
    const deletedProduct = await removeProduct(id, req.params)

    if (!deletedProduct) {
      return res.status(404).json({
        message: 'Product not found!',
      })
    }
    return res.status(200).json({
      message: 'product removed',
    })
  } catch (e) {
    next(e)
  }
}

const getByDay = async (req, res, next) => {
  const { date } = req.params
  const { _id, email, dayNorm, productsNotRecommended } = req.user

  try {
    const products = await getProductsByDay(_id, date)
    const totalKcalPerDay = await getKcalPerDay(products)
    const { kcalRemain, percentage } = await getRemain(dayNorm, totalKcalPerDay)

    res.status(200).json({
      email,
      date,
      products,
      dayNorm: Number(dayNorm),
      totalKcalPerDay,
      kcalRemain,
      percentage,
      productsNotRecommended,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { search, add, remove, getByDay }
