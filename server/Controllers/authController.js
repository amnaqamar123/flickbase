const authServices = require('../Services/authServices')



const authController = {
    async register(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await authServices.createUser(email, password)
            const token = await authServices.genAuthToken(user)
            res.cookie('x-access-token', token)
            res.status(200).send({ message: 'user created successfully', user,token})
        }
        catch (error) {
            next(error)
        }
    },
    async signin(req,res,next){
        try{
            const {email,password}=req.body
            const user=await authServices.signinwithemailandpassword(email,password)
            const token=await authServices.genAuthToken(user)
            res.cookie('x-access-token',token)
            res.status(200).send({message:'user login successfully',user,token})
        }
        catch(error){
            next(error)
        }
    },
    async isAuth(req,res,next){
        res.json(req.user)
    }
}

module.exports=authController