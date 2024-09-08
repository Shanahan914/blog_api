import express from 'express';
import routes from './routes.js';

const port = process.env.PORT || 8000

const app = express();

app.use(express.json())
app.use('/api', routes)


app.listen(port, () => console.log(`Server running on port ${port}`))