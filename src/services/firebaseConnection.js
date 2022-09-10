import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

let firebaseConfig = {
    apiKey: "AIzaSyD-mSILYSlvpdcM0Raoj6t14dSRvrFo8BY",
    authDomain: "sistemadechamados-18316.firebaseapp.com",
    projectId: "sistemadechamados-18316",
    storageBucket: "sistemadechamados-18316.appspot.com",
    messagingSenderId: "55852492979",
    appId: "1:55852492979:web:7c255610de6a62831a28c6",
    measurementId: "G-0Q0RS2JPGL"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;