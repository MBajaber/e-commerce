import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBUzlUZakH09ImE_S2DtvIq5q-gDBzmwWs",
    authDomain: "e-commerce-shopping-d4594.firebaseapp.com",
    projectId: "e-commerce-shopping-d4594",
    storageBucket: "e-commerce-shopping-d4594.appspot.com",
    messagingSenderId: "835347292048",
    appId: "1:835347292048:web:866664a79d8a6d01199d15"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { facebookProvider, googleProvider, auth };
