const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middleware/authMiddleware')
const { validateSearch } = require('../../middleware/productsValidation')
const { search, add, remove } = require('../../controllers/productsControllers')

router.get('/search', authMiddleware, validateSearch, search)
router.post('/', authMiddleware, add)
router.delete('/:productId', authMiddleware, remove)

module.exports = router
