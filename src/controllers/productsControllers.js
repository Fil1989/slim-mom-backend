const { fetchProducts, addProduct, removeProduct } = require('../services/productsService')

const search = async (req, res, next) => {
  const { product } = req.query

  try {
    const normalizedQuery = product.toLowerCase()
    const products = await fetchProducts()
    const foundProducts = products
      .filter(el => {
        const nameProd = el.title.ru.toLowerCase()
        return nameProd.includes(normalizedQuery)
      })
      .map(el => {
        return { kcal: el.calories, weight: el.weight, title: el.title.ru, id: el._id }
      })

    return res.status(200).json({
      foundProducts,
    })
  } catch (e) {
    next(e)
  }
}

const add = async (req, res, next) => {
  const { id } = req.user
  try {
    const product = await addProduct(id, req.body)

    return res.status(201).json({
      product,
    })
  } catch (e) {
    next(e)
  }
  next()
}

const remove = async (req, res, next) => {
  const { id } = req.user
  try {
    const deletedProduct = await removeProduct(id, req.params)

    if (!deletedProduct) {
      return res.status(404).json({
        status: 'fail',
        message: `Product with id '${req.params.productId}' not found!`,
      })
    }
    return res.status(200).json({
      message: 'product removed',
    })
  } catch (e) {
    next(e)
  }
  next()
}

module.exports = { search, add, remove }
