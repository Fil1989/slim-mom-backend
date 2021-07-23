const mongoose = require('mongoose')
const { Schema } = mongoose

const dailyNormSchema = new Schema({
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user',
    date: {
      type: String,
      products: {
        type: Array,
      },
    },
  },
})

const productsPerDate = mongoose.model('productsPerDate', dailyNormSchema)

module.exports = productsPerDate
