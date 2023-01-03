import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCF-nJF5vxG9SHolmV6wZn3_N560kMKuWY",
  authDomain: "odblogss.firebaseapp.com",
  projectId: "odblogss",
  storageBucket: "odblogss.appspot.com",
  messagingSenderId: "700333114039",
  appId: "1:700333114039:web:6ff81dcab1b7795eccc332"
};

const app = initializeApp(firebaseConfig);
const timestamp = serverTimestamp
const firestore = getFirestore(app)
const auth = getAuth(app)

export {timestamp, auth}
export default firestore
