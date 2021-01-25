import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAKPL25brdEyVf1QxIEgIaAnwSpgthhoyQ',
  authDomain: 'reactnativefinalprojectgymapp.firebaseapp.com',
  projectId: 'reactnativefinalprojectgymapp',
  storageBucket: 'reactnativefinalprojectgymapp.appspot.com',
  messagingSenderId: '710813520216',
  appId: '1:710813520216:web:c2a2499d2b292797d6152d',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
