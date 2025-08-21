import instance from "./instance";

const authServices = {
    register: async (userData) => {
        return await instance.post('/auth/register', userData);
    },
    login: async (userData) => {
        return await instance.post('/auth/login', userData);
    },
    
   getProfile:async(id)=>{
return await instance.get(`/auth/profile/${id}`)

   },

   updateProfile:async(id, userData)=>{
    return await instance.put(`/auth/profile/${id}`, userData)
   },
   getAllUsers:async()=>{
    return await instance.get('/auth/all')  //its a protected route we have to send ta token through autherization hearder 
   }
}  

export default authServices;