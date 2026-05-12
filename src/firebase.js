import { initializeApp } from "firebase/app"

import {
  getFirestore
} from "firebase/firestore"

import {
  getAuth,
  GoogleAuthProvider
} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDDI259uyGaUCZc6QFFLKtSYazMoKCtMBA",
  authDomain: "axora-29715.firebaseapp.com",
  projectId: "axora-29715",
  storageBucket: "axora-29715.firebasestorage.app",
  messagingSenderId: "415598916918",
  appId: "1:415598916918:web:79a4b2f412b6424c272f97",
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)

export const auth = getAuth(app)

export const provider = new GoogleAuthProvider()