import instance from "./instance";

const authServices = {
    register: async (userData) => {
        return await instance.post('/auth/register', userData);
    },
    login: async (userData) => {
        return await instance.post('/auth/login', userData);
    },
    
   getProfile:async()=>{
return await instance.get('/auth/getProfile')

   },

   updateProfile:async(id, userData)=>{
    return await instance.put(`/auth/updateProfile/${id}`, userData)
   }
}

export default authServices;