const { createUser, findByEmail } = require('../services/usersService');
const { loginAuth, logoutAuth } = require('../services/authService');
const { calculate } = require('../services/calcService');

const getDayNormKcal = async (req, res, next) => {
  // weight height age desired weight
  // console.log(req.body);
  try {
    const kcal = await calculate(req.body);

    return res.status(200).json({
      message: 'success',
      result: kcal,
    });
  } catch (e) {
    next(e);
  }
};

const signup = async (req, res, next) => {
  const user = await findByEmail(req.body);
  if (user) {
    return res.status(409).json({
      message: 'Email in use',
    });
  }
  try {
    const newUser = await createUser(req.body);

    const { email } = newUser;

    return res.status(201).json({
      message: 'success',
      user: { email },
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const token = await loginAuth(req.body);

    if (!token) {
      return res.status(401).json({
        message: 'Email or password is wrong',
      });
    }

    const { email } = await findByEmail(req.body);

    return res.status(200).json({
      status: 'success',
      token,
      user: { email },
    });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  try {
    const { id } = req.user;
    await logoutAuth(id);
    return res.status(204).json({});
  } catch (e) {
    next(e);
  }
};

module.exports = {
  signup,
  login,
  logout,
  getDayNormKcal,
};
