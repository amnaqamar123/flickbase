const {UserSchema} = require('../Model/User')
const userservices=require('./userservices')
const {ApiError}=require('../middleware/ApiError')
const httpstatus=require('http-status')

const createUser = async (email, password) => {
    try {
        if (await UserSchema.emailTaken(email)) {
            throw new ApiError(httpstatus.BAD_REQUEST,'Email already taken')
        }

        const user = new UserSchema({
            email: email,
            password: password
        })

        await user.save()
        return user
    }
    catch (error) {
        throw error
    }
}

const genAuthToken = (user) => {
    const token = user.generateAuthToken()
    return token
}
const signinwithemailandpassword=async(email,password)=>{
    try{
        const user=await userservices.findUserByemail(email)

        if(!user){
            throw new ApiError(httpstatus.NOT_FOUND,'User not found')
        }

        if(!(await user.comparePassword(password))){
             throw new ApiError(httpstatus.UNAUTHORIZED,'Invalid password')
        }
        return user;
    }
    catch(error){
        throw error
    }

}
module.exports = {
    createUser,
    genAuthToken,
    signinwithemailandpassword
}