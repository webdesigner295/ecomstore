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

const router = express.Router();

router.route('/').post(registerUser).get(getUsers)
router.post('/logout', userLogout)
router.post('/login', authUser)

router.route('/profile').get(getUserProfile).put(updateUserProfile)

router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser)

export default router