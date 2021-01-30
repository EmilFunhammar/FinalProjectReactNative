import React, { useState, useContext } from 'react';
import {
  Button,
  FlatList,
  ImageBackground,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AuthContext } from '../Context/AuthContext';
import { GetOneUserWorkout, GetUserWorkouts } from '../Context/FIrebaseContext';

const WorkoutItem = ({ itemTitle, workoutModal, itemImage }) => {
  //const { signOut } = useContext(AuthContext);

  return (
    <TouchableOpacity
      onLongPress={() => {
        signOut();
      }}
      onPress={() => {
        workoutModal(true);
        //fetchWorkouts();
      }}
    >
      <ImageBackground
        //source={{ uri: imageName }}
        source={require('../assets/1.jpg')}
        style={styles.workout_item}
        imageStyle={{ borderRadius: 20 }}
      >
        <Text style={styles.workout_item_text}>{itemTitle}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const WorkoutDecriptionItem = ({ itemWorkout }) => {
  return (
    <View>
      <Text>{itemWorkout}</Text>
      <Text>emil</Text>
    </View>
  );
};
const ModalW = ({
  workoutModal,
  setWorkoutModal,
  allWorkoutsArray,
  workoutArrat,
}) => {
  const test = () => {
    for (var i = 1; i < 10; i++) {
      console.log(i);
    }
  };

  return (
    <Modal visible={workoutModal} transparent>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <View style={styles.workout_modal}>
          <Button title="bort" onPress={() => setWorkoutModal(false)}></Button>
        </View>
      </View>
    </Modal>
  );
};

export default function Workout() {
  const [workoutModal, setWorkoutModal] = useState(false);
  const [isbool, setBool] = useState(false);
  const { user } = useContext(AuthContext);
  const workoutArrat = [
    { id: 1, workout: 'workout1' },
    { id: 2, workout: 'workout2' },
    { id: 3, workout: 'workout3' },
    { id: 4, workout: 'workout4' },
    { id: 5, workout: 'workout5' },
    { id: 6, workout: 'workout6' },
    { id: 7, workout: 'workout7' },
    { id: 8, workout: 'workout8' },
    { id: 9, workout: 'workout9' },
    { id: 10, workout: 'workout10' },
    { id: 11, workout: 'workout11' },
    { id: 12, workout: 'workout12' },
    { id: 13, workout: 'workout13' },
  ];
  const allWorkoutsArray = [
    { id: 1, title: 'back and neck' },
    { id: 2, title: 'Biceps' },
    { id: 3, title: 'Biceps' },
    { id: 4, title: 'Biceps' },
    { id: 5, title: 'Biceps' },
    { id: 6, title: 'Biceps' },
    { id: 7, title: 'Bicesdsdps' },
    { id: 8, title: 'Biceps' },
    { id: 9, title: 'Biceps' },
    { id: 10, title: 'Biceps' },
  ];

  return (
    <SafeAreaView style={{ width: '100%' }}>
      <Button
        title="get workouts"
        onPress={() => {
          console.log('button pressd');
          GetUserWorkouts(user.uid);
        }}
      ></Button>
      <View style={styles.workout}>
        <ModalW
          visible={workoutModal}
          setWorkoutModal={setWorkoutModal}
          workoutModal={workoutModal}
          //allWorkoutsArray={allWorkoutsArray}
          workoutArrat={workoutArrat}
        >
          <FlatList
            style={styles.flatListworkout}
            data={workoutArrat}
            renderItem={({ item, index }) => (
              <WorkoutDecriptionItem itemWorkout={item.workout} />
            )}
          ></FlatList>
        </ModalW>

        <FlatList
          style={styles.flatListworkout}
          data={allWorkoutsArray}
          renderItem={({ index, item }) => (
            <WorkoutItem
              itemTitle={item.title}
              itemImage={item.image}
              workoutModal={setWorkoutModal}
            />
          )}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  backgroundColor: 'transparent',
                  width: '100%',
                  height: 30,
                }}
              ></View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  workout: {
    backgroundColor: 'red',
    height: '100%',
    width: '100%',
  },
  flatListworkout: {
    backgroundColor: 'gray',
    padding: 35,
  },
  workout_item: {
    backgroundColor: '#000',
    height: 200,
    marginTop: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 20,
    borderRadius: 21,
  },
  workout_item_text: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '20%',
    color: 'white',
  },
  workout_modal: {
    backgroundColor: '#3F7134',
    flex: 0.68,
    justifyContent: 'flex-end',

    alignItems: 'center',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
});
