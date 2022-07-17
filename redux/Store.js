import { configureStore } from "@reduxjs/toolkit";
import User from "./Slices/User";
import Post from "./Slices/Posts";

export default configureStore({
    reducer: {
        user:User,
        post:Post,
    }
})