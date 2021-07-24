const calculate = async body => {
  const { weight, growth, age, desiredWeight } = body
  const result = Math.round(
    10 * Number(weight) + 6.25 * Number(growth) - 5 * age - 161 - 10 * (Number(weight) - Number(desiredWeight)),
  )

  return result
}

module.exports = {
  calculate,
}
