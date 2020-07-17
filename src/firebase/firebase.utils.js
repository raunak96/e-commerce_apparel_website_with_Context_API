import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCA8Y38lDUOzDpoQxZY22_VIQoDzWqxbFA",
    authDomain: "e-commerce-apparel-site-db.firebaseapp.com",
    databaseURL: "https://e-commerce-apparel-site-db.firebaseio.com",
    projectId: "e-commerce-apparel-site-db",
    storageBucket: "e-commerce-apparel-site-db.appspot.com",
    messagingSenderId: "755266400201",
    appId: "1:755266400201:web:8aeab65945cbe169f40218",
    measurementId: "G-BKX0TFD1F5",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
