import instance from "./instance"

const termServices={

createTerm: async(userData)=>{
 return await instance.post('/term',userData)
},



}

export default termServices