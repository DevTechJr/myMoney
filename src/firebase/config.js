import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAT1ahvNYKT0vqVDpwYW_ydLfI28gltQVg",
  authDomain: "mymoney-96140.firebaseapp.com",
  projectId: "mymoney-96140",
  storageBucket: "mymoney-96140.appspot.com",
  messagingSenderId: "857608369556",
  appId: "1:857608369556:web:fda150d8397aa3a1b78b81",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };
