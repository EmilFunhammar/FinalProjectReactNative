import firebase, { firestore } from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAKPL25brdEyVf1QxIEgIaAnwSpgthhoyQ',
  authDomain: 'reactnativefinalprojectgymapp.firebaseapp.com',
  databaseURL: 'https:ReactNativeFinalProjectGymApp.firebaseio.com',
  projectId: 'reactnativefinalprojectgymapp',
  storageBucket: 'reactnativefinalprojectgymapp.appspot.com',
  messagingSenderId: '710813520216',
  appId: '1:710813520216:web:c2a2499d2b292797d6152d',
};

if (!firebase.apps.length) {
  // const firebaseApp =
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();

export function InviteFriends() {
  // invite friend to begin workout
}

export function WorkoutSession() {
  // snapshot listiner on active session workout
}

//var workoutRef = firebase.collection('UserWorkouts').doc(userId);
export function GetUserWorkouts(userId) {
  console.log('get user workouts2');
  firebase
    .firestore()
    .collection('UserWorkouts')
    .doc(userId)
    .collection('Workouts')
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
      });
    })
    .catch(function (error) {
      console.log('Error getting document:', error);
    });

  // .doc('r037kqjhiA9WcCJ1q0t1')
  // .collection('Excercises')
  // .doc('pmy65iGueYYiZJg6ZZCB')
  // .get()
  // .then(function (doc) {
  //   if (doc.exists) {
  //     console.log('Document data:', doc.data());
  //   } else {
  //     // doc.data() will be undefined in this case
  //     console.log('No such document!');
  //   }
  // })
  // .catch(function (error) {
  //   console.log('Error getting document:', error);
  // });
}

export function GetOneUserWorkout(userId, WorkoutId) {
  firebase
    .firestore()
    .collection('UserWorkouts')
    .doc(userId)
    .collection('Workouts')
    .doc(WorkoutId)
    .get()
    .then(function (doc) {
      if (doc.exists) {
        console.log('Document data:', doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    })
    .catch(function (error) {
      console.log('Error getting document:', error);
    });
}

export function SaveUser(userId, name, email) {
  console.log('inne i Test', name, email, userId);
  firebase
    .firestore()
    .collection('Users')
    .doc(userId)
    .set({
      userId: userId,
      name: name,
      email: email,
    })
    .then(function () {
      console.log('Document successfully written!');
    })
    .catch((error) => console.log('error', error));
  console.log('slutaet av  Test', name, email);
}

export function SaveUserWorkOut(userId, workoutArray, workoutName) {
  //lopp ej för den skapar en ny workout
  let ref = firebase
    .firestore()
    .collection('UserWorkouts')
    .doc(userId)
    .collection('Workouts')
    .doc(workoutName);
  // loopa för att skapa nya exersices
  var i;
  for (i = 0; i < workoutArray.length; i++) {
    console.log('insideLoop');
    ref
      .collection('Excercises')
      .add({
        exercise: workoutArray[i].textInputValue,
        sets: workoutArray[i].setNumber,
        reps: workoutArray[i].repNumber,
      })
      .then(function () {
        console.log('Document successfully written!');
      })
      .catch((error) => console.log('error', error));
  }
  console.log('outsideLoop');
}
