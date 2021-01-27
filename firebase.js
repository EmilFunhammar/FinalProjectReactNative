// import firebase, { firestore } from 'firebase';
// import 'firebase/auth';
// import 'firebase/database';
// import 'firebase/firestore';
// import 'firebase/functions';
// import 'firebase/storage';

// const firebaseConfig = {
//   apiKey: 'AIzaSyAKPL25brdEyVf1QxIEgIaAnwSpgthhoyQ',
//   authDomain: 'reactnativefinalprojectgymapp.firebaseapp.com',
//   //databaseURL: 'https:ReactNativeFinalProjectGymApp.firebaseio.com',
//   projectId: 'reactnativefinalprojectgymapp',
//   storageBucket: 'reactnativefinalprojectgymapp.appspot.com',
//   messagingSenderId: '710813520216',
//   appId: '1:710813520216:web:c2a2499d2b292797d6152d',
// };
// if (!firebase.apps.length) {
//   const firebaseApp = firebase.initializeApp(firebaseConfig);
// }

// //const firebaseApp = firebase.initializeApp(firebaseConfig);

// export const auth = firebase.auth();
// export const db = firebase.database();
// //export const db = firebaseApp.database();
// // export const db = firebase.firestore(firebaseApp);
// // const usersCollection = db.collection('Users');
// // export const dbcollection = firestore();

// // export function storeHighScore(userId, score) {
// //   console.log('inne i highscore', userId, score);
// //   firebase.firestore().collection('emil').add({
// //     highscore: score,
// //   });
// //   console.log('lämnar highscore');
// // }

// export function Test(name, email, userId) {
//   console.log('inne i Test', name, email, userId);
//   firebase
//     .firestore()
//     .collection('Users')
//     .doc(userId)
//     .set({
//       userId: userId,
//       name: name,
//       email: email,
//     })
//     .then(function () {
//       console.log('Document successfully written!');
//     })
//     .catch((error) => console.log('error', error));
//   console.log('slutaet av  Test', name, email);
// }

// export function SaveUserWorkOut(userId, exercise, sets, reps) {
//   console.log('inne i Test', userId, exercise, sets, reps);
//   firebase
//     .firestore()
//     .collection('UserWorkouts')
//     .doc(userId)
//     .set({
//       userId: userId,
//       exercise: exercise,
//       sets: sets,
//       reps: reps,
//     })
//     .then(function () {
//       console.log('Document successfully written!');
//     })
//     .catch((error) => console.log('error', error));
//   console.log('slutaet av  Test');
// }
