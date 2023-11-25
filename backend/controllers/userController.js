
import asyncHandler from "../middelware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import generateToken from '../utils/generateToken.js'

// @Desc Auth User
// @POST /api/users/login
// @access public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = (req.body)
    
    const user = await User.findOne({email})
    if (user && await (user.matchPassword(password))) {
        generateToken(res, user._id);
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
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }
  
    const user = await User.create({
      name,
      email,
      password,
    });
  
    if (user) {
      generateToken(res, user._id);
  
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
})

// @Desc Auth User
// @POST /api/users/logout
// @access private
const userLogout = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
      });
      res.status(200).json({ message: 'Logged out successfully' });
    
})

// @Description Get User Profile
// @ GET /api/users/profile
// @access priate

const getUserProfile = asyncHandler(async (req, res) => { 
    const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
})

// @Description Update user profile
// @ PUT /api/users/profile
// @access Private

const updateUserProfile = asyncHandler(async (req, res) => { 
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
  
      if (req.body.password) {
        user.password = req.body.password;
      }
  
      const updatedUser = await user.save();
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
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





