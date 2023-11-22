
import asyncHandler from "../middelware/asyncHandler.js";
import User from "../models/userModel.js";
import  Jwt  from "jsonwebtoken";

// @Desc Auth User
// @POST /api/users/login
// @access public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = (req.body)
    
    const user = await User.findOne({email})
    if (user && await (user.matchPassword(password))) {
            const token = Jwt.sign({
                userId: user._id,
            }, process.env.JWT_SECRET, {
                expiresIn: '30d'
            })
        res.cookie('jwt', token, {
                
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 3600 * 24 * 60 * 60 * 1000
        });
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        
        })
          
        }
        else {
            res.status(401);
            throw new Error('User not found');
        }
       

    res.send('Auth User')
})

// @Desc Register User
// @POST /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
    res.send('Register User')
})

// @Desc Auth User
// @POST /api/users/logout
// @access private
const userLogout = asyncHandler(async (req, res) => {
    res.send('logout user')
})

// @Description Get User Profile
// @ GET /api/users/profile
// @access priate

const getUserProfile = asyncHandler(async (req, res) => { 
    res.send('User Profile')
})

// @Description Update user profile
// @ PUT /api/users/profile
// @access Private

const updateUserProfile = asyncHandler(async (req, res) => { 
    res.send('Update user profile')
})

// @Description Get User
// @ GET /api/users
// @access Private/Admin

const getUsers = asyncHandler(async (req, res) => { 
    res.send('Get Users')
})


// @Description Get User by id
// @ GET /api/users/profile
// @access private/Admin

const getUserById = asyncHandler(async (req, res) => { 
    res.send('Get User By Id')
})

// @Description Delete user
// @ DELETE /api/users/:id
// @access public

const deleteUser = asyncHandler(async (req, res) => { 
    res.send('Delete User')
})

// @Description Update Uerrs
// @ GET /api/users/:id
// @access Private/admin

const updateUser = asyncHandler(async (req, res) => { 
    res.send('Update user')
})

export {
    authUser,
    registerUser,
    userLogout,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    deleteUser,
    updateUser
}





