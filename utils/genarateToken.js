const jwt = require("jsonwebtoken");

const genaratrToken = (userId)=>{
    return jwt.sign({user:userId},process.env.JWT_SECRET,{expiresIn:'30d'})
}
module.exports = genaratrToken;