import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA8rlnH2icxBIYQokAEAsRa9-9Nr29Dsrk",
    authDomain: "shop-998e5.firebaseapp.com",
    projectId: "shop-998e5",
    storageBucket: "shop-998e5.appspot.com",
    messagingSenderId: "615214457315",
    appId: "1:615214457315:web:4bb4339e2c124a5a9480d6",
    measurementId: "G-QVZPM7JGW0",
    //databaseURL: "https://shop-998e5.firebaseio.com"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

export const auth = getAuth(app);