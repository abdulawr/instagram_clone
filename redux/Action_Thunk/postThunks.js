import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, doc, setDoc,getDocs, Firestore } from "firebase/firestore"; 
import { fireStore } from "../../config/firebase";

export default  createAsyncThunk(
    'post/addPost',
   async (userID) => {
        const docSnap = await getDocs(collection(doc(collection(fireStore,'posts'),userID),'userPosts'));
        let postsData = [];
        docSnap.forEach((doc) => {
           let item = doc.data();
           item.id = doc.id;
           postsData.push(item)
        });

       return postsData;
    }
);