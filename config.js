import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAN6edHQCi-l1Ufrq8HcNVJb79sohWyV5I",

    authDomain: "office-management-975f6.firebaseapp.com",

    projectId: "office-management-975f6",

    storageBucket: "office-management-975f6.appspot.com",

    messagingSenderId: "648396416824",

    appId: "1:648396416824:web:069b17530e6dcfc72d03cd",

    measurementId: "G-5XPTJHPR2T"

};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);


export default firebase;
export const API_BASE_URL = 'http://192.168.8.103:4000';
