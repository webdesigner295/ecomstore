import express from 'express'
import products from './data/product.js'
import 'dotenv/config'
import connectDB from './config/db.js'



const port = process.env.PORT 

connectDB()
const app = express()
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Get All Products
app.get('/api/products', (req, res) => {
    res.json(products)
})


// Get Products by Id

app.get('/api/products/:id', (req, res) => { 
    const id = req.params.id
    const product = products.find(p => p._id === id)
    res.json(product)
})

app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);

