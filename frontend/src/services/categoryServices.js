import instance from "./instance"

const categoryServices={

 createCategory: async(userData)=>{
  return await instance.post('/category/categories',userData)
},
getCategories: async()=>{
      return await instance.get('/category/categories')
},
updateCategory:async(id,userData)=>{
 return await instance.put(`/category/categories/${id}`,userData)
},

deleteCategory:async(id)=>{
  return await instance.delete(`/category/categories/${id}`)
}


}


export default categoryServices