const Products = require('../schema/productsSchema')

const fetchProducts = async () => {
  const result = await Products.find().sort('title')

  return result
}

module.exports = { fetchProducts }
