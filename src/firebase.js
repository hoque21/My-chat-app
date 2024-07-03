
import { initializeApp } from "firebase/app";

import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyCxFKK9AKybo9V9iu1fLVEx-B8Dg0edZUs",
  authDomain: "fir-80c58.firebaseapp.com",
  databaseURL: "https://fir-80c58-default-rtdb.firebaseio.com",
  projectId: "fir-80c58",
  storageBucket: "fir-80c58.appspot.com",
  messagingSenderId: "501611870922",
  appId: "1:501611870922:web:043693560e3fbef6cfd233",
  measurementId: "G-XD2167CMQK"
};


 initializeApp(firebaseConfig);



const auth=getAuth()
const provider= new GoogleAuthProvider()
const db = getFirestore();


export {auth,provider,db}