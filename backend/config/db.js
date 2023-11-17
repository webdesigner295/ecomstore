import mongoose from "mongoose";
import 'dotenv/config'
const connectDB = async () => {
    try {
       const conn =  await mongoose.connect(process.env.MONGODB_URI)
           console.log(`Mongoose DB Connect : ${conn.connection.host}`);
            
    
    } catch (err) {
        console.log(err);
    }
}

export default connectDB;

