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
const getProductsByDay = async (userId, date) => {
  const allDates = await productsPerDate.find({ owner: userId, date })
  const products = allDates.map(el => {
    return {
      kcal: el.kcal,
      weight: el.weight,
      title: el.title,
      id: el._id,
    }
  })
  let productsOptimized
  if (date === new Date().toLocaleDateString('fr-CA')) {
    productsOptimized = products
  } else {
    productsOptimized = products.reduce((accum, el) => {
      const accumTitles = accum.map(elem => elem.title) || []
      if (accumTitles.includes(el.title)) {
        const sameProduct = accum.find(element => element.title === el.title)
        sameProduct.weight = sameProduct.weight + el.weight
        sameProduct.kcal = sameProduct.kcal + el.kcal
      } else {
        accum.push(el)
      }
      return accum
    }, [])
  }
  return productsOptimized
}

module.exports = { fetchProducts, addProduct, removeProduct, getProductsByDay }
