import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { AuthContext } from '../Context/AuthContext';
import { useState } from 'react/cjs/react.development';
import {
  SaveUser,
  SaveUserWorkOut,
  GetUserWorkouts,
  GetOneUserWorkout,
} from '../Context/FIrebaseContext';

export default function Utvecklingn() {
  const { user } = useContext(AuthContext);

  // class CreateWorkOut {
  //   constructor(exercise, set, rep) {
  //     (this.exercise = exercise), (this.set = set), (this.rep = rep);
  //   }
  // }

  return (
    <View style={styles.container}>
      <Text>this is Utveckling</Text>
      <Button
        title="läs auth"
        onPress={() => console.log('userUID:', user.uid)}
      ></Button>
      <Button
        title="spara user"
        onPress={() => SaveUser(user.uid, 'ida', 'emil@gmail.com')}
      ></Button>
      {/* <Button
        title="skapa pperon"
        onPress={() => {
          let user = new CreateWorkOut('legs', 4, 4);
          WorkoutArray.push(user);
          console.log('emil');
        }}
      ></Button> */}
      <Button
        title="Läs från databas"
        onPress={() => ReadfromDataBase()}
      ></Button>
      <Button
        title="Spara workout"
        onPress={() => SaveUserWorkOut(user.uid, 'biceps', 3, 10, '16')}
      ></Button>
      <Button
        title="Hämta workouts"
        onPress={() => GetUserWorkouts(user.uid)}
      ></Button>
      <Button
        title="Hämta en workout"
        onPress={() => GetOneUserWorkout(user.uid, '123456')}
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
