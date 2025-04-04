import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

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

export default connectDB;
