import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { AuthContext } from '../Context/AuthContext';
import { auth } from '../firebase';
import { db, dbcollection } from '../firebase';
import firebase, { firestore } from 'firebase';
import { useState } from 'react/cjs/react.development';

export default function Utvecklingn() {
  const { ReadAuth, user } = useContext(AuthContext);

  const WorkoutArray = [
    {
      exercise: 'biceps',
      set: 3,
      rep: 3,
    },
    {
      exercise: 'chest',
      set: 4,
      rep: 6,
    },
  ];

  const WriteToDataBase = () => {
    console.log('skriv til databas');
    firebase
      .firestore()
      .collection('Users')
      .add({
        name: 'test1',
        email: 'test1',
      })
      .then((data) => addComplete(data))
      .catch((error) => console.log('error', error));
  };

  class CreateWorkOut {
    constructor(exercise, set, rep) {
      (this.exercise = exercise), (this.set = set), (this.rep = rep);
    }
  }

  return (
    <View style={styles.container}>
      <Text>this is Utveckling</Text>
      <Button
        title="läs auth"
        onPress={() => console.log('userUID:', user.uid)}
      ></Button>
      <Button
        title="skriv til databas"
        onPress={() => WriteToDataBase()}
      ></Button>
      <Button
        title="skapa pperon"
        onPress={() => {
          let user = new CreateWorkOut('legs', 4, 4);
          WorkoutArray.push(user);
          console.log('emil');
        }}
      ></Button>
      <Button
        title="print array"
        onPress={() => console.log(WorkoutArray)}
      ></Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
