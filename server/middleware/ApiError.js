const mongoose=require('mongoose')
const httpstatus=require('http-status')

class ApiError extends Error{
    constructor(statusCode,message){
        super()
        this.statusCode=statusCode
        this.message=message
    }
}

const handleError=(err,res)=>{
    const {statusCode,message}=err;

    res.status(statusCode).json({
        status:'error',
        statusCode:statusCode,
        message:message
    })
}

const convertToApiError=(err,req,res,next)=>{
    let error=err;

    const statusCode=error.statusCode||
    (error instanceof mongoose.Error ? httpstatus.BAD_REQUEST : httpstatus.INTERNAL_SERVER_ERROR)

    const message=error.message||httpstatus[statusCode]

    if(!(error instanceof ApiError)){
        error=new ApiError(statusCode,message)
    }

    next(error)
}

module.exports={
    ApiError,
    handleError,
    convertToApiError,
}