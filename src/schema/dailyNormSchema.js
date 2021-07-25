const mongoose = require('mongoose')
const { Schema } = mongoose

const dailyNormSchema = new Schema({
  data: {
    type: String,
    default: new Date().toLocaleDateString(),
  },
  food: {
    type: Array,
  },
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user',
  },
})

const productsPerDate = mongoose.model('productsPerDate', dailyNormSchema)

module.exports = productsPerDate
