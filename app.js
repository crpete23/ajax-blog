const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.disable('x-powered-by')
app.use(bodyParser.json())
app.use(cors())
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

const postsRoutes = require('./src/routes/posts')
app.use('/posts', postsRoutes)

app.use((req,res,next)=>{
  return next({status:404, message:'Route Not Found'})
})

app.use((err,req,res,next)=>{
  console.error(err)
  const status = err.status || 500
  res.status(status).json({error: err})
})

const listener = () => console.log(`Listening on port ${port}`)
app.listen(port, listener)

module.exports = app
