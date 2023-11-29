import express from 'express';

const router = express.Router()
import {protect, admin} from '../middelware/authMiddleware.js'

import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivery,
    getAllOrders
}
from '../controllers/orderController.js'

router.route('/').post(protect, addOrderItems).get(protect, admin, getAllOrders)
router.route('/myorder').get(protect, getMyOrders)
router.route('/:id').get(protect, admin, getOrderById)

router.route('/:id/pay').put(protect, updateOrderToPaid)

router.route('/:id/deliver').put(protect, admin, updateOrderToDelivery)

export default router
