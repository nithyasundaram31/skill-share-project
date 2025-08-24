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
    enum:['user','admin'],
    default:'user'
},

  profile:{
    contact:{
      type: Number,
    }
   
  }, // Nesting the profile schema

  // bookmarks: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Resource",
  //   },
  // ],
  
});
   
module.exports = mongoose.model('User', userSchema, 'users');
        