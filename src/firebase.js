import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDYjUD8ZAsseZeH1gYJ-GOGFwpZRBHa8lk",
    authDomain: "giphyapi-c71e2.firebaseapp.com",
    projectId: "giphyapi-c71e2",
    storageBucket: "giphyapi-c71e2.appspot.com",
    messagingSenderId: "538455616928",
    appId: "1:538455616928:web:ef7a72b0a90695e3b508c5"
}


const initFirebase = firebase.initializeApp(firebaseConfig);

export const database = initFirebase.firestore();
export const auth = initFirebase.auth()
export default database