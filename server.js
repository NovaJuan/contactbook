const express = require('express');
const xss = require('xss-clean');
const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');

const app = express();

//Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(helmet());
app.use(xss());
app.use(cors());

//Routes
app.use('/api/v1/users', require('./routes/users'))
app.use('/api/v1/auth', require('./routes/auth'))
app.use('/api/v1/contacts', require('./routes/contacts'))

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`Server on port ${PORT}`));