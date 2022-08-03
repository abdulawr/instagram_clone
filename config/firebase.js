import { getApp, initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: "",
    databaseURL: "",
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





