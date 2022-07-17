import { createSlice } from "@reduxjs/toolkit";
import User_thk from "../Action_Thunk/User_thk";


const User = createSlice({
    name:'user',
    initialState:{},
    reducers:{
        addUser: (state,action) => {
          state.user = action.payload;
        },

        deleteUser: (state) => {
         state.user = {};
        }

    },
    extraReducers:{
    [User_thk.fulfilled] : (state,action) => {
        state.user = action.payload;
    },
    [User_thk.rejected]: (state, action) => {
      state.user = action.payload;
    },

    }
});

export const {addUser,deleteUser} = User.actions;
export default User.reducer;
