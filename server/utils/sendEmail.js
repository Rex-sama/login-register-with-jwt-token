const nodemailer = require('nodemailer')

const sendEmail = (options) => {
    const transporter = nodemailer.createTransport({
        service : process.env.EMAIL_SERVICE,
        auth : {
            user : process.env.EMAIL_USERNAME,
            pass : process.env.EMAIL_PASSWORD 
        }
    })

    const mailoption = {
        from : {
            name: 'Password Reset',
            address: process.env.EMAIL_FROM
        } ,
        to : options.to,
        subject : options.success,
        html : options.text,
        
    }

    transporter.sendMail(mailoption,function(err,info){
        if(err){
            console.log(err)
        }else{
            console.log(info);
        }
    })
}

module.exports = sendEmail;