const User = require('../schema/userSchema')

const createUser = async body => {
  const user = await User({ ...body })
  return await user.save()
}

const findByEmail = async ({ email }) => {
  return await User.findOne({ email })
}

const findById = async id => {
  return await User.findById(id)
}

const updateToken = async (id, token) => {
  await User.updateOne({ _id: id }, { token })
}

const saveNotRecommendedInDb = async (productsNotRecommended, email) => {
  await User.findOneAndUpdate({ email }, { $set: { productsNotRecommended } })
}

module.exports = {
  createUser,
  findByEmail,
  updateToken,
  findById,
  saveNotRecommendedInDb,
}
