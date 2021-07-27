const User = require('../schema/userSchema')

const calculate = async body => {
  const { weight, height, age, desiredWeight } = body
  const result = Math.round(
    10 * Number(weight) + 6.25 * Number(height) - 5 * age - 161 - 10 * (Number(weight) - Number(desiredWeight)),
  )

  return result
}

const calcKcal = async body => {
  const { kcal, weight } = body
  const res = Math.round((kcal / 100) * weight)
  return res
}

const getSaveDayNorm = async (body, email) => {
  const dayNorm = await calculate(body)
  await User.findOneAndUpdate(
    { email },
    {
      $set: { dayNorm },
    },
  )
  return dayNorm
}

module.exports = {
  calculate,
  getSaveDayNorm,
  calcKcal,
}
