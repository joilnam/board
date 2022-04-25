import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD1zzNQG5kPyEXMqBhnZFCBfFov7X1jcIM",
    authDomain: "board-8906c.firebaseapp.com",
    projectId: "board-8906c",
    storageBucket: "board-8906c.appspot.com",
    messagingSenderId: "913413671348",
    appId: "1:913413671348:web:5c3efb26576090d07c4ae1"
};
export default firebase.initializeApp(firebaseConfig);
