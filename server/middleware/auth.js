const jwt = require('jsonwebtoken')
const User = require('../models/Posts')

exports.protect = async (req,res,next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]
    }
    
    if(!token){
        res.status(401).json("Unauthorized Access")
    }
    try {
        const verified = jwt.verify(token,process.env.TOKEN_SECRET)
        const user = await User.findById(verified.id)

        if(!user){
            res.status(404).json("No User found with this id")
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(400).json('Unauthorized Access')
    }
}