import express from 'express';
import routes from './routes.js';
import errorHandler from './middleware/error.js';

const port = process.env.PORT || 8000

const app = express();

app.use(express.json())
app.use('/api', routes)

app.use((req,res,next) =>{
    const error = new Error('not found')
    error.status = 404
    next(error)
})

//errorHander - middelware for errors
app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port ${port}`))