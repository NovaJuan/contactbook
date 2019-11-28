const mongoose = require('mongoose');
const config = require('config');
const uri = config.get('mongoURI');

const connectDB = async () => {
	try {
		const db = await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true
		});
		console.log(`Database connected on host ${db.connection.host}`);
	} catch (err) {
		console.log(err.message);
		process.exit(1);
	}
};

module.exports = connectDB;
