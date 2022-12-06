import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD8S_Nr2u70Sks_xo-61DI8oCSCJQa_HPA",
    authDomain: "todolist-vue-5ffb9.firebaseapp.com",
    projectId: "todolist-vue-5ffb9",
    storageBucket: "todolist-vue-5ffb9.appspot.com",
    messagingSenderId: "201588277103",
    appId: "1:201588277103:web:854ddc27c10e59d4cbb29a",
    measurementId: "G-1L9SVVEWE7"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  export const db = firebaseApp.firestore();