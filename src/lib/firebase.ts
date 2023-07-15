import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCwzOnabWiNdRnVjSmFCM21LvN_Fqtbxrk",
  authDomain: "gamingstore-f968a.firebaseapp.com",
  projectId: "gamingstore-f968a",
  storageBucket: "gamingstore-f968a.appspot.com",
  messagingSenderId: "374879030768",
  appId: "1:374879030768:web:13f3a3e80524a703d46135",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
