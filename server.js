require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const colors = require('colors')
const connectDB = require('./config/db')

const app = express()

connectDB()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

// routes
app.use('/api/auth', require('./routes/user'))
app.use('/api/search', require('./routes/search'))

app.listen(process.env.PORT, ()=>{
	console.log('app connected'.brightCyan)
})