const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middleware/authMiddleware')
const { validateSearch, validateAddProduct } = require('../../middleware/productsValidation')
const { search, add, remove, getByDay } = require('../../controllers/productsControllers')

router.use(authMiddleware)
router.get('/search/:product', validateSearch, search)
router.post('/', validateAddProduct, add)
router.delete('/:productId', remove)
router.get('/:date', getByDay)

module.exports = router
