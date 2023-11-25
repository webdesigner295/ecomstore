import express from 'express';
import {
    authUser,
    registerUser,
    userLogout,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    deleteUser,
    updateUser
} from '../controllers/userController.js';
import { protect, admin } from '../middelware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/logout', userLogout)
router.post('/auth', authUser)

router.route('/profile').get( protect, getUserProfile).put( protect, updateUserProfile)

router.route('/:id').get(protect, admin, getUserById).put( protect, admin,  updateUser).delete(protect, admin,deleteUser)

export default router