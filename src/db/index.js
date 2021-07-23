const mongoose = require('mongoose')
require('dotenv').config()

const db = mongoose.connect(process.env.URI_DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

mongoose.connection.on('connected', err => {
  console.log('Database connection successful')
})

mongoose.connection.on('error', err => {
  console.log(`Mongoose connection error: ${err.message}`)
})

mongoose.connection.on('disconnected', err => {
  console.log(`Mongoose disconnected`)
})

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Connected for DB disconnected and app terminated')
    process.exit(1)
  })
})
module.exports = db
