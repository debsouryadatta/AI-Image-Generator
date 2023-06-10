import express from 'express';
import * as dotenv from 'dotenv'
import cors from 'cors'

import connectDB from './mongodb/connect.js'
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'

dotenv.config() // To get the access of dotenv files

const app = express()
app.use(cors())
app.use(express.json({limit: '50mb'})) // For getting the req.body

app.use('/api/v1/post', postRoutes) // Providing the base path to the routes
app.use('/api/v1/dalle', dalleRoutes) // Providing the base path to the routes

app.get('/', async (req, res) => {
    res.send('Hello from DALL-E')
})

const startServer = async (req, res) => {
    try {
        connectDB(process.env.MONGODB_URL)
        app.listen(8080, ()=> console.log('Server has started on port https://ai-image-generator-lyart-delta.vercel.app/'))
    } catch (error) {
        console.log(error);
    }

}

startServer()