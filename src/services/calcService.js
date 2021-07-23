const User = require('../schema/userSchema');

const calculate = async body => {
  const { weight, growth, age, desiredWeight } = body;
  const result =
    10 * Number(weight) + 6.25 * Number(growth) - 5 * age - 161 - 10 * (Number(weight) - Number(desiredWeight));

  //   const user = await updateOne({  });

  return Math.round(result);
};

module.exports = {
  calculate,
};
