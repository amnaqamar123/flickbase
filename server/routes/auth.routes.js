const express=require('express')
const router=express.Router()
const Auth=require('../middleware/Auth')

const {register,signin,isAuth}=require('../Controllers/authController')

router.post('/register',register)
router.post('/signin',signin)
router.get('/isauth',Auth(),isAuth)

module.exports=router;