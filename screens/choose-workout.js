import React, { useState, useContext, useEffect } from 'react';
import {
  Button,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { AuthContext } from '../Context/AuthContext';
import { useNavigation } from '@react-navigation/native';

import {
  //SaveUser,
  //SaveUserWorkOut,
  GetUserWorkouts,
  //GetOneUserWorkout,
  //WorkoutSession,
  GetUserWorkout,
  AddWorkoutSession,
} from '../Context/FIrebaseContext';
import { TextInput } from 'react-native-gesture-handler';

const EnterNameModal = ({
  modalVisible,
  setModalVisible,
  //exersicesArray,
  workoutId,
  workoutTitle,
}) => {
  //const [workoutName, setWorkoutName] = useState('');
  const [exersicesArray, setExersicesArray] = useState([]);
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  //const { user } = useContext(AuthContext);
  //console.log(workoutTitle);
  const [kod, setkod] = useState('');
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}
    >
      <View style={styles.modal}>
        {/* <Text>{workoutTitle}</Text> */}
        <TextInput
          placeholder="ange kod:"
          onChangeText={(text) => setkod(text)}
        />

        <Button
          title="use worout1"
          onPress={() => {
            //console.log(kod);
            //console.log('tiyle', workoutTitle);
            //console.log('ex aray', exersicesArray);
            GetUserWorkout(workoutId, user.uid, setExersicesArray);
            setTimeout(() => {
              AddWorkoutSession(user.email, kod, exersicesArray);
            }, 5000);

            setModalVisible(false);
            //navigation.navigate('start_workout');
          }}
        />
      </View>
    </Modal>
  );
};

const WorkoutItem = ({ modalVisible, setModalVisible, itemTitle, itemId }) => {
  const { user } = useContext(AuthContext);
  //const [exersicesArray, setExersicesArray] = useState([]);

  //useEffect(() => {});

  return (
    <TouchableOpacity
      onLongPress={() => {}}
      onPress={() => {
        setModalVisible(true);
        // GetUserWorkout(itemId, user.uid, setExersicesArray);
      }}
    >
      <EnterNameModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        //exersicesArray={exersicesArray}
        workoutId={itemId}
        workoutTitle={itemTitle}
      />
      <View style={styles.workout_item}>
        <Text style={styles.workout_item_text}>{itemTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function Workout() {
  const { user } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);

  // const loadData = async () => {
  //   await GetUserWorkouts(user.uid, setUserWorkoutsArray);
  // };
  // useEffect(() => {
  //   loadData();
  // }, []);

  const [UserWorkoutsArray, setUserWorkoutsArray] = useState([]);

  return (
    <SafeAreaView>
      <View style={styles.workout}>
        <FlatList
          style={styles.flatListworkout}
          data={UserWorkoutsArray}
          renderItem={({ index, item }) => (
            <WorkoutItem
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              itemTitle={item.name}
              itemId={item.id}
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
              />
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
        <Button
          title="read"
          onPress={() => GetUserWorkouts(user.uid, setUserWorkoutsArray)}
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
  },
  workout: {
    height: '100%',
    width: '100%',
  },
  flatListworkout: {
    backgroundColor: 'gray',
    padding: 35,
  },
  workout_item: {
    backgroundColor: '#3F7134',
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
  modal: {
    position: 'absolute',
    top: '45%',
    left: '15%',
    backgroundColor: 'white',
    height: 120,
    width: 300,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
