// firebase.js

import { initializeApp } from 'firebase/app';
import  { getAuth} from  'firebase/auth';
//import { getFirestore  , applicationDefault } from 'firebase-admin';

const firebaseConfig = {
    apiKey: "AIzaSyBJMtNINW3SrXOozLMpn0YZoSEWv62Oebk",
    authDomain: "library-management-syste-2e45b.firebaseapp.com",
    projectId: "library-management-syste-2e45b",
    storageBucket: "library-management-syste-2e45b.appspot.com",
    messagingSenderId: "665344126326",
    appId: "1:665344126326:web:518713356c2dd68ce89e57",
    measurementId: "G-0042QPM9CK"
    // credential: applicationDefault(),  
  };
  
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;