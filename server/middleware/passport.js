const passport=require('passport')
const {Strategy: JwtStrategy,ExtractJwt}=require('passport-jwt')
const {UserSchema}=require('../Model/User')
require('dotenv').config()

const jwtOptions={
    secretOrKey:process.env.SECRET_KEY,
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
}

const jwtVerify=async(jwtPayload,done)=>{
    try{
        const user=await UserSchema.findById(jwtPayload.sub)
        if(!user){
            return done(null,user)
        }
        else{
            return done(null,false)
        }
    }
    catch(error){
        return done(error,false)
    }
}


const jwtStrategy=new JwtStrategy(jwtOptions,jwtVerify)

module.exports={jwtStrategy}
