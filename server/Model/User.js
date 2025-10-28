const mongoose = require('mongoose');
const dotenv = require('dotenv');
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
dotenv.config();

const User = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Invalid email');
                }
                else {
                    return true;
                }
            }
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        firstname: {
            type: String,
            trim: true,
            maxlength: 100
        },
        lastname: {
            type: String,
            trim: true,
            maxlength: 100
        },
        age: {
            type: Number,
            min: 18,
        },
        date: {
            type: Date,
            default: Date.now()
        },
        verified: {
            type: Boolean,
            default: false
        }

    }
)

User.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
    }
    else {
        next()
    }
})

User.statics.emailTaken = async function (email) {
    const user = await this.findOne({ email: email })
    return !!user

}

User.methods.generateAuthToken = function () {
    const user = this
    const userObj = { sub: user._id.toHexString(), email: user.email }
    const token = jwt.sign(userObj, process.env.SECRET_KEY, { expiresIn: '3d' })
    return token
}

User.methods.comparePassword=async function(candidatepassword){
    const user=this;
    const isMatch=await bcrypt.compare(candidatepassword,user.password)
    return isMatch
}

const UserSchema = mongoose.model("User", User)
module.exports = { UserSchema }