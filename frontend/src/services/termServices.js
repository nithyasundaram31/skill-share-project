import instance from "./instance"

const termServices={

createTerm: async(userData)=>{
 return await instance.post('/term',userData)
},
getTerms:async()=>{
    return await instance.get('/term')
},
updateTerm:async(id,userData)=>{
   return await instance.put(`/term/${id}`,userData)
},
deleteTerm:async(id)=>{
   return await instance.delete(`/term/${id}`)
}

}

export default termServices