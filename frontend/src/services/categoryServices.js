import instance from "./instance"

const categoryServices={

 createCategory: async(userData)=>{
  return await instance.post('/category/categories',userData)
},


}


export default categoryServices