const express = require('express');
const logger = require('morgan');
const cors = require('cors');

// const contactsRouter = require('./src/routes/api/contacts')
const usersRoutes = require('./src/routes/api/usersRoutes');

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.disable('x-powered-by');

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: 10000 }));

// app.use('/api/contacts', contactsRouter)
app.use('/api/users', usersRoutes);

app.use((req, res) => {
  res.status(404).json({ message: `Use route /api/contacts` });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
