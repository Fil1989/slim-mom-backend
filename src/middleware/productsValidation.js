const Joi = require('joi')

const validateSearch = (req, res, next) => {
  const schemaSearch = Joi.object({
    product: Joi.string().required().min(3),
  })

  const validation = schemaSearch.validate(req.query)

  if (validation.error) {
    const [{ message }] = validation.error.details

    return res.status(400).json({ message: `field ${message.replace(/"/g, '')}` })
  } else {
    next()
  }
}

module.exports = { validateSearch }
