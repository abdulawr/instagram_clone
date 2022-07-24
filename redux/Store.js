import { configureStore } from "@reduxjs/toolkit";
import User from "./Slices/User";
import Post from "./Slices/Posts";
import Following from "./Slices/Following";

export default configureStore({
    reducer: {
        user:User,
        post:Post,
        follow:Following
    }
})