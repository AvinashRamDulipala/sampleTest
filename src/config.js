import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
/*..... Development Mode ------------*/

const config = {
  apiKey: "AIzaSyCqpwLmhmUH5jAocFyvKfC2Jooe68p8AyM",
  authDomain: "assessment-test-75a62.firebaseapp.com",
  databaseURL: "https://assessment-test-75a62.firebaseio.com",
  projectId: "assessment-test-75a62",
  storageBucket: "assessment-test-75a62.appspot.com",
  messagingSenderId: "960414607533",
  appId: "1:960414607533:web:3e5a53bfe885e7c539be24",
  measurementId: "G-W91N66CYGZ"
};



firebase.initializeApp(config);


export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth();
export default firebase;

