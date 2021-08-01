const express = require('express')
const router = express.Router()

const { validateAuth, validateCalc, validateAuthorized } = require('../middleware/usersValidation')
const authMiddleware = require('../middleware/authMiddleware')

const {
  getDayNormKcal,
  getSaveDayNormController,
  signup,
  login,
  logout,
  current,
} = require('../controllers/usersControllers')

router.get('/current', authMiddleware, current)
router.post('/public', validateCalc, getDayNormKcal)
router.post('/private', authMiddleware, validateCalc, getSaveDayNormController)
router.post('/signup', validateAuth, signup)
router.post('/login', validateAuthorized, login)
router.post('/logout', authMiddleware, logout)

module.exports = router
