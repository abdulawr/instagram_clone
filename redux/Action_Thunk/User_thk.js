import { createAsyncThunk } from "@reduxjs/toolkit";

export default  createAsyncThunk(
    'user/addUser',
    (data) => {
        return data.data;
    }
);