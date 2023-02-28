const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
require('dotenv').config()


const mongoUrl = process.NODE_ENV === 'test'
	? process.env.MONGODB_URI
	: process.env.MONGODB_TEST_URI

mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app