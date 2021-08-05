const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

const usersRoutes = require('./src/routes/usersRoutes')
const productsRoutes = require('./src/routes/productsRoutes')

const app = express()
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.disable('x-powered-by')

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json({ limit: 10000 }))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/users', usersRoutes)
app.use('/products', productsRoutes)

app.use((req, res) => {
  res.status(404).json({ message: `Wrong route` })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
