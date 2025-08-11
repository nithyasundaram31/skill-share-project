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
}

}

export default resourceServices