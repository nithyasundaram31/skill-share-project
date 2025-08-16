import instance from "./instance"

const commentServices={
createComment:async(userData)=>{
return await instance.post("/comment/comments",userData)
},

getComments:async(id)=>{
return await instance.get(`/comment/comments/${id}`)
},

deleteComment:async(id)=>{
return await instance.delete(`/comment/comments/${id}`)
}

}


export default commentServices