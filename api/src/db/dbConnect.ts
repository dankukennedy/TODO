import mongoose from "mongoose";

 const connectDB = async ():Promise<void> => {
        try {
            const uri = process.env.MONGO_URI as string;
            if(!uri){
                throw new Error("MONGO_URI is not defined in environment variables");
            }
            const conn = await mongoose.connect(uri);
            console.log(`🚀 MongoDB Connected: ${conn.connection.host}`);
        } catch (error) {
            console.error("❌MongoDB Connection Failed:", error);
            process.exit(1);
        }
};

export default connectDB;