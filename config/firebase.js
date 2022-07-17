import { getApp, initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBxAq0pMxv_O3sj3NvHvb55FY340Z43lhk",
    authDomain: "instragram-clone-17364.firebaseapp.com",
    projectId: "instragram-clone-17364",
    storageBucket: "instragram-clone-17364.appspot.com",
    messagingSenderId: "927983938547",
    appId: "1:927983938547:web:79a8d63c1111c00cc48086",
    measurementId: "G-8H4RNM6DBR",
    databaseURL: "https://instragram-clone-17364-default-rtdb.firebaseio.com/",
};


let app;
if (getApp.length === 0) {
    app = initializeApp(firebaseConfig);
}
else{
     app = getApps;
}

export const auth = getAuth(app);
export const database = getDatabase(app);
export const fireStore = getFirestore(app);
export const storage = getStorage(app);




