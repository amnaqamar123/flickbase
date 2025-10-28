const {UserSchema}=require('../Model/User')

const findUserByemail=async(email)=>{
    const user=await UserSchema.findOne({email})
    return user

}

module.exports={findUserByemail}