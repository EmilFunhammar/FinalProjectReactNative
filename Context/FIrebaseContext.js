import firebase, { firestore } from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBuypY79KmAfSyx-LA19KBBMryP8oN5z3A',
  authDomain: 'newfinal-project.firebaseapp.com',
  projectId: 'newfinal-project',
  storageBucket: 'newfinal-project.appspot.com',
  messagingSenderId: '686815357216',
  appId: '1:686815357216:web:5ae92386bee09e12df0f45',
};

if (!firebase.apps.length) {
  // const firebaseApp =
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export function ListenToTheWorkout(garbage, workoutId, setArray) {
  console.log(garbage);
  firebase
    .firestore()
    .collection('WorkoutSession')
    .doc(workoutId)
    .onSnapshot((doc) => {
      setArray(doc.data().users);
    });
}
export function ListenToTheWorkout2(workoutId, setArray) {
  firebase
    .firestore()
    .collection('WorkoutSession')
    .doc(workoutId)
    .collection('Exersices')
    .onSnapshot(function (querySnapshot) {
      var cities = [];

      querySnapshot.forEach(function (doc) {
        let docs = doc.data();
        console.log('data', docs);
        let document = {
          exersice: docs.exercise,
          data: docs.users,
          reps: docs.reps,
          sets: docs.sets,
        };
        console.log('document', document);
        cities.push(document);
      });
      setArray(cities);
    });
}

export function ListenToTheWorkout1(workoutId, setArray) {
  let array = [];
  let ref = firebase
    .firestore()
    .collection('WorkoutSession')
    .doc(workoutId)
    .collection('Exersices');

  ref.onSnapshot(function (querySnapshot) {
    var Exersices = [];
    querySnapshot.forEach(function (doc) {
      Exersices.push(doc.data().sets);
      var userInfo = {
        user1Id: doc.data().userEmail,
        user2Id: doc.data().userEmail2,
      };

      array.push(userInfo);
    });
    //console.log('Current sets: ', Exersices.join(', '));
    console.log('array1', array);
  });
}

export function AddUserToWorkout(workoutId, userEmail) {
  let ref = firebase.firestore().collection('WorkoutSession').doc(workoutId);
  ref
    .update({
      users: firebase.firestore.FieldValue.arrayUnion(userEmail),
    })
    .then(function () {
      console.log('Document successfully written!');
    })
    .catch((error) => console.log('error', error));
}

export function AddWorkoutSession(userEmail, workoutId, exersicesArray) {
  console.log('ex array', exersicesArray);
  let ref = firebase.firestore().collection('WorkoutSession').doc(workoutId);
  ref.set({ users: firebase.firestore.FieldValue.arrayUnion(userEmail) });

  var i;
  for (i = 0; i < exersicesArray.length; i++) {
    //console.log('ex id:', exersicesArray[i].id);
    ref
      .collection('Exersices')
      .doc(exersicesArray[i].id)
      .set({
        userEmail: userEmail,
        exercise: exersicesArray[i].exercise,
        sets: exersicesArray[i].sets,
        reps: exersicesArray[i].reps,
      })
      .then(function () {
        console.log('Document successfully written!');
      })
      .catch((error) => console.log('error', error));
  }
  console.log('finish?');
}

export function WorkoutSession(userId, workoutName) {
  // snapshot listiner on active session workout
  firebase
    .firestore()
    .collection('WorkoutSession')
    .doc('YMOa4tregVEiNFbGp5d5')
    .collection('Excercises')
    .doc('GKxIOAkucgZkasRAsE3g')
    .onSnapshot(
      {
        // Listen for document metadata changes
        includeMetadataChanges: true,
      },
      function (doc) {
        // ...
        console.log(doc.id, ' => ', doc.data());
      }
    );
}

export function GetUserWorkout(workoutId, userId, setExersicesArray, ary) {
  let exersicesArray = [];
  //console.log('emil', workoutId);
  firebase
    .firestore()
    .collection('UserWorkouts')
    .doc(userId)
    .collection('Workouts')
    .doc(workoutId)
    .collection('Excercises')
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        var OneExerscise = {
          id: doc.id,
          exercise: doc.data().exercise,
          sets: doc.data().sets,
          reps: doc.data().reps,
        };
        //console.log('inne i', OneExerscise);
        exersicesArray.push(OneExerscise);
      });

      setExersicesArray(exersicesArray);
    })
    .catch(function (error) {
      console.log('Error getting document:', error);
    });
}

//var workoutRef = firebase.collection('UserWorkouts').doc(userId);
export function GetUserWorkouts(userId, setUserWorkoutsArray) {
  let WorkoutArray = [];
  firebase
    .firestore()
    .collection('UserWorkouts')
    .doc(userId)
    .collection('Workouts')
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        var OneWorkout = { id: doc.id, name: doc.data().workoutName };
        WorkoutArray.push(OneWorkout);
      });

      //console.log('WorkoutArray1', WorkoutArray);
      setUserWorkoutsArray(WorkoutArray);
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
    .doc();
  ref.set({ workoutName: workoutName });
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
