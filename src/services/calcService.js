const User = require('../schema/userSchema')

const calculate = async body => {
  const { weight, height, age, desiredWeight } = body
  const result = Math.round(
    10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) - 161 - 10 * (Number(weight) - Number(desiredWeight)),
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

const getKcalPerDay = async products => {
  return await products.reduce((accum, el) => {
    accum += el.kcal
    return accum
  }, 0)
}

const getRemain = async (dayNorm, totalKcalPerDay) => {
  const kcalRemain = dayNorm - totalKcalPerDay
  const percentage = Math.round((totalKcalPerDay / dayNorm) * 100)

  return { kcalRemain, percentage }
}

module.exports = {
  calculate,
  getSaveDayNorm,
  calcKcal,
  getKcalPerDay,
  getRemain,
}
