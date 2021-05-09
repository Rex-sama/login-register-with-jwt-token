exports.privateData = (req,res,next) => {
    // res.status(200).json('You got Access to this route')
    const data = req.user.username
    res.status(200).json(data)
    
}