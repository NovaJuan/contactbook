const express = require('express');
const xss = require('xss-clean');
const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');
const sanitize = require('express-mongo-sanitize');
const limiter = require('express-rate-limit');
const connectDB = require('./config/db');
const path = require('path');

const app = express();
connectDB();

//Middlewares
app.use(
	limiter({
		windowMs: 15 * 60 * 1000, // 15 minutes
		max: 100 // limit each IP to 100 requests per windowMs
	})
);
app.use(logger('dev'));
app.use(express.json());
app.use(
	express.urlencoded({
		extended: false
	})
);
app.use(helmet());
app.use(xss());
app.use(sanitize());
app.use(cors());

//Routes
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/contacts', require('./routes/contacts'));

// Serve statics on production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	);
}

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`Server on port ${PORT}`));
