import instance from "./instance"

const resourceServices={

   createResource:async(userData)=>{
return await instance.post("/resource/resources",userData)

   } 
}

export default resourceServices