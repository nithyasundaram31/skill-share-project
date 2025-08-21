import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({

    name:"user",
    initialState:{
        user:[]
    },
    reducers: {
        setUser:(state,action)=>{      //dispatch(setUsers(response.data));  action.payload = response.data
         state.user=action.payload;   // state.users = [ {id:1,...}, {id:2,...}, {id:3,...} ]
        }                 
    }          


})

 export const {setUser}= userSlice.actions;
 export const selectUser = (state) => state.user.user;      // user:{user: []}  // initialState.user  this is the array of users  }  so it will take state.user.user                                    
 export  default userSlice.reducer; 