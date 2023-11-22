import express from 'express'
import { getProduct, getProductById } from '../controllers/ProductController.js'

const router = express.Router()

router.route('/').get(getProduct)

router.route('/:id').get(getProductById)


export default router