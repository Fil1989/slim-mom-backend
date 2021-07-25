const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middleware/authMiddleware')
const { search } = require('../../controllers/productsControllers')

router.get('/search/:product', authMiddleware, search)

module.exports = router
