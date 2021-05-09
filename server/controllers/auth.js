const User = require('../models/Posts')
const jwt = require('jsonwebtoken')

exports.register = async(req,res,next) => {
    const {username,email,password}= req.body

    if(!username || !email || !password){
        res.status(400).json('Please fill all the details')
    }
    
    try {
        const user = await User.create({
            username,
            email,
            password,
        });
            const token = jwt.sign({id:user._id},process.env.TOKEN_SECRET,{expiresIn : "20h"})
            res.status(200).json({user,token})
    } catch(error)  {
        res.status(400).json('Email already exist')
    }
} 

exports.login = async(req,res,next) => {
    const {email,password} = req.body;
    
    if(!email && !password){
        res.status(400).json('Please fill Email and Password')
    }
    if(!email){
        res.status(400).json('Please fill Email address')
    }
    if(!password){
        res.status(400).json('Please fill Password')
        
    }
    
    try {
        const user = await User.findOne({email}).select("+password");
        if(!user){
            res.status(404).json("Invalid Email or Password")
        }
        const match = await user.comparePasswords(password);
        if(!match){
            res.status(404).json("Invalid Email or Password")
        }
        const token = jwt.sign({id:user._id},process.env.TOKEN_SECRET,{expiresIn : "20h"})
        res.status(200).json(token)

    } catch (error) {
        res.status(400).json(error.message)
    }
} 

exports.forgotpassword = async(req,res,next) => {
    const {email} = req.body;

    try {
        const user = await User.findOne({email})
        if(!user){
            res.status(404).json('Email could not be sent')
        }
        const resetToken = user.resetPasswordToken();
        await user.save

        const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

        const message = `
        <h1>You have requested a password reset</h1>
        <p>Please go to this link to reset your password</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `;

       

    } catch (error) {
        res.status(400).json(error)
    }
} 

exports.resetpassword = (req,res,next) => {
    res.send('Reset Password')
} 