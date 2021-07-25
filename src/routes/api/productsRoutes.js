const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middleware/authMiddleware')
const { validateSearch } = require('../../middleware/productsValidation')
const { search } = require('../../controllers/productsControllers')

router.get('/search/:product', authMiddleware, validateSearch, search)

module.exports = router
