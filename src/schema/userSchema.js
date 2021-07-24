const mongoose = require('mongoose')
const { Schema } = mongoose

const bcrypt = require('bcrypt')

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  token: {
    type: String,
    default: null,
  },

  desiredWeight: {
    type: String,
    default: null,
  },

  dayNorm: {
    type: String,
    default: null,
  },
  productsNotRecommended: {
    type: Array,
    default: null,
  },
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return null
  }
  this.password = await bcrypt.hash(this.password, 6)
  next()
})

userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('user', userSchema)

module.exports = User
