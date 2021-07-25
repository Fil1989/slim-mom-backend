const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middleware/authMiddleware')
const { validateSearch } = require('../../middleware/productsValidation')
const { search, add, remove } = require('../../controllers/productsControllers')

router.get('/search/:product', authMiddleware, validateSearch, search)
router.post('/', authMiddleware, add)
router.post('/:productId', authMiddleware, remove)

module.exports = router
