import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD2kpJiaDwSj8OyLuPXhI4EwcoZUUgAWPQ",
  authDomain: "a-game-of-chance.firebaseapp.com",
  databaseURL: "https://a-game-of-chance.firebaseio.com",
  projectId: "a-game-of-chance",
  storageBucket: "a-game-of-chance.appspot.com",
  messagingSenderId: "486861563155",
  appId: "1:486861563155:web:e3069e93db16443695e6e6",
  measurementId: "G-8ERT81LPRL",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
