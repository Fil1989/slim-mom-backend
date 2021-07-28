const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const { validateSearch, validateAddProduct } = require('../middleware/productsValidation')
const { search, add, remove, getByDay } = require('../controllers/productsControllers')

router.use(authMiddleware)
router.post('/', validateAddProduct, add)
router.get('/search', validateSearch, search)
router.get('/:date', getByDay)
router.delete('/:productId', remove)

module.exports = router
