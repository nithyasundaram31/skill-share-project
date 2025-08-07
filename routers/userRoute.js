const express = require('express');
const { registerUser, loginUser, getProfile, updateProfile, getAllStudents,  updateStudent } = require('../controllers/userController');
const   authenticate  = require('../middlewares/auth');


const userRoute = express.Router();

// Common routes
userRoute.post('/register',registerUser);
userRoute.post('/login',  loginUser);

//profile
userRoute.get('/profile/:id', authenticate(), getProfile);
userRoute.put('/profile/:id',authenticate(), updateProfile );







module.exports=userRoute;