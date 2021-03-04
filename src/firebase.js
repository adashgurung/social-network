import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB-pxlRAt7A-4B7k6chEQZfryaQOP3tdqs",
  authDomain: "social-network-23789.firebaseapp.com",
  projectId: "social-network-23789",
  storageBucket: "social-network-23789.appspot.com",
  messagingSenderId: "492103286225",
  appId: "1:492103286225:web:19b7fc4b17b6dfc7e534f0",
  measurementId: "G-0N0LYVGY7W",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const storage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
//export default db;
