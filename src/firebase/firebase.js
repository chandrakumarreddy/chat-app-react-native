import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
} from 'react-native-dotenv';

const firebaseConfig = {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export default firebase;
