import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ImageBackground,
  Button,
  FlatList,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react/cjs/react.development';

const SetNumberView = () => {
  const [setNumber, setSetNumber] = useState(0);

  return (
    <>
      <TouchableOpacity
        onPress={() => setSetNumber((prev) => prev - 1)}
        activeOpacity={0.8}
      >
        <View style={styles.create_workout_add_and_remove}>
          <Text style={{ fontSize: 30 }}>-</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.create_workout_number}>
        <Text style={{ fontSize: 22 }}>{setNumber}</Text>
      </View>
      <TouchableOpacity
        onPress={() => setSetNumber((prev) => prev + 1)}
        activeOpacity={0.8}
      >
        <View
          style={{
            ...styles.create_workout_add_and_remove,
            marginRight: 10,
          }}
        >
          <Text style={{ fontSize: 30 }}>+</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const RepNumberView = () => {
  const [repNumber, setRepNumber] = useState(0);

  return (
    <>
      <TouchableOpacity
        onPress={() => setRepNumber((prev) => prev - 1)}
        activeOpacity={0.8}
      >
        <View style={styles.create_workout_add_and_remove}>
          <Text style={{ fontSize: 30 }}>-</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.create_workout_number}>
        <Text style={{ fontSize: 22 }}>{repNumber}</Text>
      </View>
      <TouchableOpacity
        onPress={() => setRepNumber((prev) => prev + 1)}
        activeOpacity={0.8}
      >
        <View
          style={{
            ...styles.create_workout_add_and_remove,
            marginRight: 10,
          }}
        >
          <Text style={{ fontSize: 30 }}>+</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const WorkOutTextInputView = () => {
  return (
    <>
      <TextInput
        style={{ marginLeft: 5 }}
        placeholder="Enter workout exercise:"
        placeholderTextColor="black"
      ></TextInput>
    </>
  );
};

const CreateWorkoutItem = () => {
  return (
    <View style={styles.card_view}>
      <View style={styles.create_workout}>
        <WorkOutTextInputView />
        <View style={styles.create_workout_view}>
          <RepNumberView></RepNumberView>
          <SetNumberView></SetNumberView>
        </View>
      </View>
    </View>
  );
};

const FlatListworkoutItem = ({ workoutArrat }) => {
  return (
    <View style={{ height: 100, width: 100 }}>
      <Text>Emil</Text>
    </View>
  );
};

const WorkoutsScrollView = () => {
  return (
    <ScrollView style={{ backgroundColor: '#3F7134', width: '100%' }}>
      <View style={{ justifyContent: 'space-evenly' }}>
        <CreateWorkoutItem></CreateWorkoutItem>
        <CreateWorkoutItem></CreateWorkoutItem>
        <CreateWorkoutItem></CreateWorkoutItem>
        <CreateWorkoutItem></CreateWorkoutItem>
        <CreateWorkoutItem></CreateWorkoutItem>
        <CreateWorkoutItem></CreateWorkoutItem>
        <CreateWorkoutItem></CreateWorkoutItem>
      </View>
    </ScrollView>
  );
};

const WorkOutFlatList = () => {
  return (
    <FlatList
      style={{ backgroundColor: 'yellow', width: 100, width: 100 }}
      renderItem={(item) => <CreateWorkoutItem></CreateWorkoutItem>}
    ></FlatList>
  );
};

export default function Create_Workout() {
  return (
    <View style={{ ...styles.container, backgroundColor: 'white' }}>
      <WorkoutsScrollView></WorkoutsScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  create_workout: {
    borderRadius: 6,
    flexDirection: 'row',
    width: '96%',
    height: 60,
    justifyContent: 'space-between',
  },
  create_workout_add_and_remove: {
    backgroundColor: '#3F7134',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 30,
  },
  create_workout_view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  create_workout_number: {
    backgroundColor: 'lightgray',
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 30,
  },
  card_view: {
    marginTop: 10,
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: 'gray',
  },
});
