const Products = require('../schema/productsSchema')

const fetchProducts = async () => {
  const result = Products.find()

  return result
}
module.exports = { fetchProducts }
