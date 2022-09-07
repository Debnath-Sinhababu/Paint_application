// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcJSvovr1dpbAmAlq2fsa1CLKPrjR8xvU",
  authDomain: "paintapp-fabba.firebaseapp.com",
  projectId: "paintapp-fabba",
  storageBucket: "paintapp-fabba.appspot.com",
  messagingSenderId: "609746962460",
  appId: "1:609746962460:web:4db2aaa65a33acd18537d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let auth=getAuth(app)
export default auth