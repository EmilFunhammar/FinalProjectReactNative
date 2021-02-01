import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Auth, AuthContext } from '../Context/AuthContext';
import {
  SaveUser,
  SaveUserWorkOut,
  GetUserWorkouts,
  GetOneUserWorkout,
  WorkoutSession,
} from '../Context/FIrebaseContext';

export default function WorkoutSession1() {
  // fetch the workout
  //WorkoutSession()
  const testArray = [
    {
      id: 1,
      sets: 0,
      reps: 8,
      exercise: 'Biceps',
    },
    {
      id: 2,
      sets: 3,
      reps: 3,
      workout: 'legs',
    },
    {
      id: 3,
      sets: 4,
      reps: 3,
      workout: 'chest',
    },
  ];
  return (
    <View style={styles.container}>
      <FlatList
        style={{ backgroundColor: 'gray', width: '100%' }}
        data={testArray}
        renderItem={({ item, index }) => (
          <ExerciseItem
            exercise={item.exercise}
            sets={item.sets}
            reps={item.reps}
          />
        )}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                backgroundColor: 'transparent',
                width: '100%',
                height: 10,
              }}
            ></View>
          );
        }}
      />
    </View>
  );
}

const ExerciseItem = ({ exercise, sets, reps }) => {
  return (
    <View style={styles.exerciseItem}>
      <Text style={styles.exercise}>{exercise}</Text>
      <RenderUsers sets={sets} reps={reps} />
      <RenderUsers sets={sets} reps={reps} />
      <RenderUsers sets={sets} reps={reps} />
    </View>
  );
};

const RenderUsers = ({ exercise, sets, reps }) => {
  const { user } = useContext(AuthContext);
  return (
    <View style={styles.setsAndReps}>
      <View style={styles.users}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View style={styles.checkBox}></View>
          <Text> {user.email}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <NegativSignView />
        <View>
          <Text>sets</Text>
          <Text>3/{sets}</Text>
        </View>
        <PlusSignView />
        <View style={{ flexDirection: 'row' }}>
          <NegativSignView />
          <View>
            <Text>reps</Text>
            <Text>3/{reps}</Text>
          </View>
          <PlusSignView />
        </View>
      </View>
    </View>
  );
};

const PlusSignView = () => {
  return (
    <View style={styles.add_and_remove}>
      <Text
        style={styles.add_and_remove_text}
        onPress={() => console.log('plus sign pressed')}
      >
        +
      </Text>
    </View>
  );
};

const NegativSignView = () => {
  return (
    <View style={styles.add_and_remove}>
      <Text
        style={styles.add_and_remove_text}
        onPress={() => console.log('negative sign pressed')}
      >
        -
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseItem: {
    backgroundColor: '#3F7134',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    borderTopEndRadius: 5,
    borderTopLeftRadius: 5,
  },
  exercise: {
    marginLeft: 10,
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 22,
  },

  setsAndReps: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 3,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  setsAndRepsNumbers: {},
  users: {},
  add_and_remove: {
    //backgroundColor: '#3F7134',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 30,
  },
  add_and_remove_text: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  checkBox: {
    backgroundColor: 'red',
    height: 20,
    width: 20,
    borderRadius: 20,
    marginLeft: 5,
  },
});
