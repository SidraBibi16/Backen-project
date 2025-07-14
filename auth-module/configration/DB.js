const mongoose=require("mongoose");
async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongoDB connected Successfully")
    } catch (error) {
       console.log("mongoDB connection Failed",error.message) 
       process.exit(1)
    }
}
module.exports = connectDB;