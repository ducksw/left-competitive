require('dotenv').config()
const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.LOCALHOST, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		console.log("###### ->CONNECTED DATABASE<- ######");
	} catch (error) {
		console.log("#### ->FAIL<- ####" + error.message );
	}
}

module.exports = connectDB;
