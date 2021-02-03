import firebase, { firestore } from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/storage';
import { set } from 'react-native-reanimated';

const firebaseConfig = {
  apiKey: 'AIzaSyBuypY79KmAfSyx-LA19KBBMryP8oN5z3A',
  authDomain: 'newfinal-project.firebaseapp.com',
  projectId: 'newfinal-project',
  storageBucket: 'newfinal-project.appspot.com',
  messagingSenderId: '686815357216',
  appId: '1:686815357216:web:5ae92386bee09e12df0f45',

  // apiKey: 'AIzaSyAKPL25brdEyVf1QxIEgIaAnwSpgthhoyQ',
  // authDomain: 'reactnativefinalprojectgymapp.firebaseapp.com',
  // databaseURL: 'https:ReactNativeFinalProjectGymApp.firebaseio.com',
  // projectId: 'reactnativefinalprojectgymapp',
  // storageBucket: 'reactnativefinalprojectgymapp.appspot.com',
  // messagingSenderId: '710813520216',
  // appId: '1:710813520216:web:c2a2499d2b292797d6152d',
};

if (!firebase.apps.length) {
  // const firebaseApp =
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export function ListenToTheWorkout(workoutId, setArray) {
  firebase
    .firestore()
    .collection('WorkoutSession')
    .doc(workoutId)
    .onSnapshot((doc) => {
      setArray(doc.data().users);
    });

  //firebase
  //     .firestore()
  //     .collection('WorkoutSession')
  //     .onSnapshot((snapshot) => {
  //       var users = { user1: snapshot.docs.map((doc) => doc.data().user1) };
  //       //setUserArray(snapshot.docs.map((doc) => doc.data().user1))
  //       setUserArray(users);
  //     });
  // {
  //   // Listen for document metadata changes
  //   includeMetadataChanges: true,
  // },
  //function (doc) {
  //var user = [doc.data().user1, doc.data().user2, doc.data().user3];
  // var user = {
  //   user1: doc.data().user1,
  //   user2: doc.data().user2,
  //   user3: doc.data().user3,
  // };
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
        let document = {
          exersice: docs.exercise,
          users: docs.users,
          reps: docs.reps,
          sets: docs.sets,
        };
        cities.push(document);
      });
      setArray(cities);
    });
}

//.onSnapshot(function (doc) {
//console.log('Current data: ', doc.data().user1);
// var user = {
//   user1: doc.data().user1,
//   user2: doc.data().user2,
//   user3: doc.data().user3,
// };
// var user = [doc.data().user1, doc.data().user2, doc.data().user3];
// console.log('users', user);
// users.push(user);
//console.log('userArray', users);
//setArray(userArray);
//});
//console.log('userArray', array);
//console.log('userArray4', users);
//setArray(users);
//}

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
  console.log('inne i firebase');
  //let snapshotArray = [];
  let ref = firebase
    .firestore()
    .collection('WorkoutSession')
    .doc(workoutId)
    .collection('Exersices');
  var i;
  for (i = 0; i < exersicesArray.length; i++) {
    console.log('ex id:', exersicesArray[i].id);
    ref
      .doc(exersicesArray[i].id)
      .set({
        userEmail: userEmail,
        exercise: exersicesArray[i].exercise,
        sets: exersicesArray[i].sets,
        reps: exersicesArray[i].reps,
        // add more?
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

export function GetUserWorkout(workoutId, userId, setExersicesArray) {
  let exersicesArray = [];
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
        console.log('inne i', OneExerscise);
        exersicesArray.push(OneExerscise);
      });
      console.log('emil', exersicesArray);
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

  // doc.data() is never undefined for query doc snapshots
  //console.log('doc', doc.data().workoutName);

  //console.log('userarray', WorkoutArray);
  // console.log('userWorkoutArray', UserWorkoutArray);
  // varja doc.data.Ex name till varja itemi flatlist
  //console.log(doc.id, ' => ', doc.data());

  //return UserWorkoutsArray;
  //.then(function (querySnapshot) {
  //console.log('query', querySnapshot);
  //querySnapshot.forEach((doc) => console.log(doc.id, ' => ', doc.data()));
  // querySnapshot.forEach(function (doc) {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, ' => ', doc.data());
  // });
  //})
  // .catch(function (error) {
  //   console.log('Error getting document:', error);
  // });

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

// export function GetOneUserWorkout(userId, workoutName) {
//   console.log('Name', workoutName);
//   firebase
//     .firestore()
//     .collection('UserWorkouts')
//     .doc(userId)
//     .collection('Workouts')
//     .doc(workoutName)
//     .collection('Excercises')
//     .doc('yZ9jWVfOCQXhYO5avZax')
//     .get()
//     .then(function (doc) {
//       if (doc.exists) {
//         // console.log('Document data:', doc.data());
//       } else {
//         // doc.data() will be undefined in this case
//         console.log('No such document!');
//       }
//     })
//     .catch(function (error) {
//       console.log('Error getting document:', error);
//     });
// }

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
