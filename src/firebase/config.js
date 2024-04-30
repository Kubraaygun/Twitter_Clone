// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "twitter-8a16c.firebaseapp.com",
  projectId: "twitter-8a16c",
  storageBucket: "twitter-8a16c.appspot.com",
  messagingSenderId: "719303331229",
  appId: "1:719303331229:web:09103850d9540de2d17374"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


//auth yapisinin referansini alma
export const auth = getAuth(app)

//google saglayacisinin referansini alma
export const provider=new GoogleAuthProvider()

//veritabani referansini al
export const db= getFirestore(app)

//storage referansini al
export const storage=getStorage(app) 