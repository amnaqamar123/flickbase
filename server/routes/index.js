const express=require('express')
const router=express.Router()
const authRoute=require('./auth.routes')
const articleRoute=require('./article.route')

const routesIndex=[
    {
        path:'/auth',
        route:authRoute
    },
    {
        path:'/articles',
        route:articleRoute
    }
]
routesIndex.forEach(route =>{
    router.use(route.path,route.route)
})

module.exports=router