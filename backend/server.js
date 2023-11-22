import express from 'express'
// import products from './data/product.js'
import 'dotenv/config'
import connectDB from './config/db.js'
import productRoute from './routes/productRoute.js'
import userRoute from './routes/userRoute.js'
import { notFound, errorHandler } from './middelware/errorMiddleware.js'



const port = process.env.PORT 

connectDB()
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.use('/api/products', productRoute)
app.use('/api/users', userRoute)

app.use(notFound);

app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);

