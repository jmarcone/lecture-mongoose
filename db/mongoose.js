import mongoose from "mongoose";

try{
    const url = process.env.MONGO_URI
    await mongoose.connect(url)
    console.log(`connected to mongo via mongoose ${mongoose.connection.host}`)
   
}catch (error){
    console.error(error.message);
}

export default mongoose;