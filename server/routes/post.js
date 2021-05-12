const express = require('express')
const router = express.Router();
const { register , login , forgotpassword , resetpassword } = require('../controllers/auth')

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/forgotpassword').post(forgotpassword)
router.route('/resetpassword/:resetToken').put(resetpassword)

//Private Route
const {privateData} = require('../controllers/privateRoute')
const {protect} = require('../middleware/auth')
router.route('/home').get(protect,privateData)

module.exports = router;