const mongoose = require('mongoose')
const { Schema } = mongoose

const productsSchema = new Schema({
  categories: {
    type: Array,
  },
  weight: {
    type: Number,
  },
  title: {
    type: Object,
  },
  calories: {
    type: Number,
  },
  groupBloodNotAllowed: {
    type: Array,
    default: null,
  },
})

const Products = mongoose.model('products', productsSchema)

module.exports = Products
