const passport = require('passport')
const { ApiError } = require('./ApiError')
const {roles}=require('../config/roles')
const httpStatus=require('http-status')



const verify = (req, res, resolve, reject,rights) => async (err, user) => {
    if (err || !user) {
        return reject(new ApiError(401, 'sorry,unauthorized'))
    }

    req.user = user;

    if (rights.length){
        let action=rights[0]
        let resource=rights[1]

         const permission = roles.can(req.user.role)[action](resource);

          if (!permission.granted) {
            return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden, you do not have the required rights/permissions'));
        }
         console.log(req.user, "User is authenticated successfully!");
          res.locals.permission = permission; 
           console.log(permission, "Permission granted to the user!");



    }

    resolve();
}

const Auth =(...rights)=> async (req, res, next) => {
     console.log(rights, "Rights"); 
    return new Promise((resolve, reject) => {
        passport.authenticate('jwt', { session: false }, verify(req, res, resolve, reject,rights))(req, res, next)
    })
        .then(() => {
            next()
        })
        .catch((err) => {
            return next(new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized'));
        })
}

module.exports = Auth