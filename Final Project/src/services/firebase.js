import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // <-- هذا جديد

const firebaseConfig = {
  apiKey: "AIzaSyB0aovjJ3FSzRSfVXRmvQFYnHnf-rcnnwk",
  authDomain: "car-rental-web-applicati-c825b.firebaseapp.com",
  projectId: "car-rental-web-applicati-c825b",
  storageBucket: "car-rental-web-applicati-c825b.appspot.com", // تأكد هنا
  messagingSenderId: "1028399697457",
  appId: "1:1028399697457:web:2362fd5201a4a2a644cf10"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // <-- عرفنا الـ storage
