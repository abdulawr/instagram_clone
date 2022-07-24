import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, doc, setDoc,getDocs, Firestore } from "firebase/firestore"; 
import { fireStore } from "../../config/firebase";

export default  createAsyncThunk(
    'follow/addFollowing',
   async (userID) => {
        const docSnap = await getDocs(collection(doc(collection(fireStore,'following'),userID),'userFollower'));
        let postsData = [];
        docSnap.forEach((doc) => {
          postsData.push(doc.id)
        });

        return postsData;
    }
);