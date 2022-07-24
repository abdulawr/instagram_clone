import { createSlice } from "@reduxjs/toolkit";
import FollowingThunks from "../Action_Thunk/FollowingThunks";

const Following = createSlice({
    name:'follow',
    initialState:{follow:[]},
    reducers:{
        addFollowing: (state,action) => {
          const result = Array.isArray(action.payload);
          if(result) {
            state.follow = action.payload;
          }
          else {
            state.follow.push(action.payload);
          }
        },
        deleteDOC:(state,action)=>{
          const index = state.follow.indexOf(action.payload);
          if (index > -1) {
            state.follow.splice(index, 1);
          }
        },
        deleteFollowing: (state) => {
         state.follow = [];
        }
    },
    extraReducers:{
    [FollowingThunks.fulfilled] : (state,action) => {
     // console.log(action)
        state.follow = action.payload;
    },

  }
});

export const {addFollowing,deletePost,deleteDOC} = Following.actions;
export default Following.reducer;
