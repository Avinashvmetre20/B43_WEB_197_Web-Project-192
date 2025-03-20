const mongoose = require("mongoose");
const dotenv =require("dotenv");
dotenv.config();


const connectdb = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB);
        console.log(`monogodb conneted to ${conn.connection.host}`)
    }
    catch(err){
        console.log(err,"error in connecting db")
    }
}
module.exports = connectdb;