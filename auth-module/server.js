const dotenv=require("dotenv");
const connectDB=require("./configration/DB");
const express=require("express");
const cors=require("cors")
const authRoutes=require("./routes/authRoutes")
const signinRoutes = require("./routes/signinRoutes");
const app=express();
app.use(cors());
app.use(express.json());
app.use("/uploads",express.static("uploads"))
dotenv.config()
connectDB();
app.use("/api", authRoutes);
app.use("/api", signinRoutes);
const PORT=8000;
app.listen(PORT,()=>{
    console.log(`server is listening at port:${PORT}`)
})