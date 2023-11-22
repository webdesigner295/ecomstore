import asyncHandler from '../middelware/asyncHandler.js'

import Product from '../models/productModel.js'


// Description get all products
// @route GET /api/products
// @access public
const getProduct = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})

// Description get product by id
// @route GET /api/products/:id
// @sccess public
const getProductById = asyncHandler(async (req, res) => { 
    const product = await Product.findById(req.params.id)
    res.json(product)
    if (product) {
        res.status(200).json(product)
    }
    else {
        res.status(404).json({message: 'Product not found'})
    }
})

export {getProduct, getProductById}