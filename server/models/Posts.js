const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required : [true,'Please enter username']
    },
    email : {
        type : String,
        required : [true,'Please enter Email '],
        unique : true
    },
    password : {
        type : String,
        required : [true,"Please enter Password"],
        minlength : 6,
        select : false
    },
    token : String,
    resetToken : String,
    resetExpire : Date,
})

UserSchema.pre('save',async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt = 10
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

UserSchema.methods.comparePasswords = async function(password){
    return await bcrypt.compare(password,this.password);
}

UserSchema.methods.resetPasswordToken = async function(){
    const token = crypto.randomBytes(20).toString("hex");

    this.resetToken = crypto.createHash("sha256").update(token).digest("hex");
    this.resetExpire = Date.now() + 10 *(60 *1000)
}

const User = mongoose.model('user',UserSchema);

module.exports = User;