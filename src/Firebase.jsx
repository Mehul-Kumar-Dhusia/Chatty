import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBy2_CIayYkZQzXmeKAfVCSoULnUn96EG8",
  authDomain: "grocery-list-dac7a.firebaseapp.com",
  databaseURL: "https://grocery-list-dac7a-default-rtdb.firebaseio.com",
  projectId: "grocery-list-dac7a",
  storageBucket: "grocery-list-dac7a.appspot.com",
  messagingSenderId: "389983319251",
  appId: "1:389983319251:web:1ae1afba93e905447d9026"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)
