const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectdb = require("./config/db");
const userRouter = require("./routes/user.route");
const assetRoute = require("./routes/portfolio.routes")

dotenv.config()

const app = express();

app.use(express.json());

app.get("/api",(req,res)=>{
    res.send("Heathy");
})

app.use("/api/user",userRouter);
app.use("/api/asset",assetRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT,async()=>{
    await connectdb()
    console.log(`Port is listing on ${PORT}`)
})
