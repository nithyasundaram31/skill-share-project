import instance from "./instance"

const resourceServices={

   createResource:async(userData)=>{
return await instance.post("/resource/resources",userData)

   } ,
  uploadSingleFile: async (formData) => {
  return await instance.post("/file/single", formData, {
    headers: {
      "Content-Type": "multipart/form-data" //we have to  sent the data in multipart formdata becase we cannot sent by JSON it will not acccept in text+ files 
    }
  });
},
getResources:async()=>{
return await instance.get("/resource/resources")
},

updateResource:async(id,userData)=>{
  return await instance.put(`/resource/resources/${id}`,userData)
},
getResourceById:async(id)=>{
  return await instance.get(`/resource/resources/${id}`)
},
deleteResource:async(id)=>{
  return await instance.delete(`/resource/resources/${id}`)
},

incrementViews:async(id,userId)=>{
  return await instance.put(`/resource/resources/${id}/view`,{ userId })
},

toggleLike:async(id, userId)=>{
  return await instance.put(`/resource/like/${id}`,{ userId })
},
// dislikeResource:async(id,userId)=>{
//   return await instance.post(`/resource/resources/${id}/dislike`,{userId})
// }



}

export default resourceServices