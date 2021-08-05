const app = require('../app')
const db = require('../src/db')
require('dotenv').config()

const PORT = process.env.PORT

db.then(
  app.listen(PORT, async () => {
    console.log(`Server running. Use our API on port: ${PORT}`)
  }),
).catch(err => console.log(`Server not running. Error message: ${err.message}`))
