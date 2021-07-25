const Products = require('../schema/productsSchema')
const productsPerDate = require('../schema/dailyNormSchema')

const { calcKcal } = require('../services/calcService')

const fetchProducts = async () => {
  const result = await Products.find().sort('title')

  return result
}

const addProduct = async (userId, body) => {
  const calc = await calcKcal(body)

  return await productsPerDate.create({ food: { ...body, kcal: calc }, owner: userId })
}

const removeProduct = async (userId, body) => {
  const calc = await calcKcal(body)

  return await productsPerDate.remove({ food: { ...body, kcal: calc }, owner: userId })
}
module.exports = { fetchProducts, addProduct, removeProduct }
