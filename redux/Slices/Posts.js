import { createSlice } from "@reduxjs/toolkit";
import postThunks from "../Action_Thunk/postThunks";

const Posts = createSlice({
    name:'post',
    initialState:{post:[]},
    reducers:{
        addPost: (state,action) => {
          const result = Array.isArray(action.payload);
          if(result) {
            state.post = action.payload;
          }
          else {
            state.post.push(action.payload);
          }
         
        },

        deletePost: (state) => {
         state.post = [];
        }
    },
    extraReducers:{
    [postThunks.fulfilled] : (state,action) => {
     // console.log(action)
        state.post = action.payload;
    },

   }
});

export const {addPost,deletePost} = Posts.actions;
export default Posts.reducer;
