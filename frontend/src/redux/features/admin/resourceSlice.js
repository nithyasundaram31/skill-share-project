import { createSlice } from "@reduxjs/toolkit";

const  resourceSlice=createSlice({

     name: 'resource',
    initialState: {
       title: '',
       term: '',
       category:"",
       type:"",
       url:"",
       likes:[]

    },
    reducers: {
        setTitle: (state, action) => {     //The state is the current data stored in Redux for a particular slice.eg:state = { title: "Old Title",term: "JavaScript"}
         state.title = action.payload;  //An action is an instruction you send to Redux to tell it what you want to do.
        },                               //The payload is the data you send along with the action.(setTitle("react"))
        setTerm: (state, action) => {      //  // state → current slice data  . action.payload → new value to store
            state.term = action.payload;    
        },
         setCategory: (state, action) => {
            state.category= action.payload;
        },
         setType: (state, action) => {
            state.type = action.payload;
        },
         setUrl: (state, action) => {
            state.url= action.payload;
        },
         setLikes: (state, action) => {
            state.likes = action.payload;
        }
    }
})

export const { setTitle,setTerm,setCategory,setType,setUrl,setLikes } = resourceSlice.actions;
export const  selectTitle=(state)=>state.resource.title
export const  selectTerm=(state)=>state.resource.term
export const  selectCategory=(state)=>state.resource.category
export const  selectType=(state)=>state.resource.type
export const  selectUrl=(state)=>state.resource.url
export const  selectLikes=(state)=>state.resource.likes
export default resourceSlice.reducer;