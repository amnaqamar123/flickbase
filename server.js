const express = require('express')
const mongoose = require('mongoose')
const app = express()
const body_Parser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()
const routes = require('./server/routes')
const passport = require('passport')
const { jwtStrategy } = require('./server/middleware/passport')
const { handleError, convertToApiError } = require('./server/middleware/ApiError')
app.use(body_Parser.json())

const port = process.env.PORT || 3000;

const MongoURI = process.env.MONGO_URI
mongoose.connect(MongoURI)

app.use(passport.initialize())
passport.use('jwt', jwtStrategy)

app.use('/api', routes)

app.use(convertToApiError)
app.use((err, req, res, next) => {
   handleError(err, res)
})

app.listen(port, () => {
   console.log(`server is running on port ${port}`)
})