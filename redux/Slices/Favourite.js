import { createSlice } from "@reduxjs/toolkit";

const Fav = createSlice({
    name:'fav',
    initialState:{fav:[]},
    reducers:{
        addFav: (state,action) => {
        const index = state.fav.indexOf(action.payload);
            const result = Array.isArray(action.payload);
            if(result) {
            state.fav = action.payload;
            }
            else {
            state.fav.push(action.payload);
            }
        },

        deleteFav: (state) => {
         state.fav = [];
        }
    },
});

export const {addFav,deleteFav} = Fav.actions;
export default Fav.reducer;
