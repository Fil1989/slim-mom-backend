const Products = require('../schema/productsSchema')
const productsPerDate = require('../schema/dailyNormSchema')

const { calcKcal } = require('../services/calcService')

const fetchProducts = async () => {
  const result = await Products.find().sort('title')

  return result
}

const addProduct = async (userId, body) => {
  const calc = await calcKcal(body)

  return await productsPerDate.create({ ...body, kcal: calc, owner: userId })
}

const removeProduct = async (userId, { productId }) => {
  return await productsPerDate.findOneAndRemove({ _id: productId, owner: userId })
}

module.exports = { fetchProducts, addProduct, removeProduct }
