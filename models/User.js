const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name']
  },

  email:{
    type:String,
    required: [true, 'Please provide a email'],
     unique: true,
    
  },
  password:{
   type:String,
   required: [true, 'Please provide a password'],
    select:false, 
   
  },

role:{
    type:String,
    enum:['user', 'admin'],
    default:'user'
},

  profile:{
   address: {
      type: String,
    },
    dob: {
      type: Date,
    },
      gender: {
      type: String,
      enum: ['male', 'female', 'other'], 
    },
   
  }, // Nesting the profile schema
  
});
   
module.exports = mongoose.model('User', userSchema, 'users');
        