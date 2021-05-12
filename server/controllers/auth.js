const User = require('../models/Posts')
const jwt = require('jsonwebtoken')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')

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
       
        const resetToken = await user.resetPasswordToken();
        await user.save()

        const resetUrl = `http://localhost:3000/resetpassword/${resetToken}`;

        const message = `
        <body style="background-color:rgb(247, 245, 245);height:250px;padding-top:10px;">
        <div style="border:1px solid rgb(223, 215, 219); height:220px;width:520px;margin-left:auto;margin-right:auto;background-color:white;margin-top:10px;">
        <h1 style=" text-align: center;">Hello ${user.email},</h1>
        <h2 style=" text-align: center;">You have requested a password reset</h2>
        <p style=" text-align: center;">Please click on the link to reset your password</p>
        <div style=" text-align: center;" >
        <button style=" background-color:rgb(51, 53, 182);border:none;width:200px;height:40px;text-align: center;">
        <a href=${resetUrl} clicktracking=off style="text-decoration:none;color:white; font-size: 18px;text-align: center;">Reset Password</a>
        </button>   
        </div>
        </div>
        </body>
        `;
        try {
            await sendEmail({
                to:user.email,
                subject: 'Password Reset',
                text:message

            });
            res.status(200).json({success:true,data:"Email Sent! Check your mailbox"})
        } catch (error) {
            user.resetToken =undefined
            user.resetExpire =undefined

            await user.save()
            res.status(500).json(error)
        }
       

    } catch (error) {
        res.status(400).json("Please Enter your registered email")
    }

} 

exports.resetpassword = async (req,res,next) => {
    const resetPasswordToken =  crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

    try {
        const user = await User.findOne({
           resetToken: resetPasswordToken,
           resetExpire: {$gt : Date.now()}

        })

    if(!user){
        res.status(400).json("Password cannot Reset.Try Again")
    }   else{
    user.password = req.body.password;
    user.resetToken = undefined;
    user.resetExpire = undefined;
    await user.save();

    res.status(201).json("Password Successfully Reset")
    }
    } catch (error) {
        res.status(400).json(error)
    }
} 