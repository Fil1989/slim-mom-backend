const { fetchProducts } = require('../services/productsService')

const search = async (req, res, next) => {
  const { product } = req.params
  const normalizedQuery = product.toLowerCase()

  try {
    const products = await fetchProducts()
    const foundProducts = products
      .filter(el => {
        const nameProd = el.title.ru.toLowerCase()
        return nameProd.includes(normalizedQuery)
      })
      .map(el => {
        return { kcal: el.calories, weight: el.weight, title: el.title.ru }
      })

    return res.status(200).json({
      message: 'success',
      foundProducts,
    })
  } catch (e) {
    next(e)
  }
}

module.exports = { search }
