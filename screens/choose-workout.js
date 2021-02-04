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
  //workoutId,
  workoutTitle,
}) => {
  //const [workoutName, setWorkoutName] = useState('');
  const [exersicesArray, setExersicesArray] = useState([]);
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  console.log(workoutId);
  //const { user } = useContext(AuthContext);
  //console.log(workoutTitle);
  //GetUserWorkout(workoutId, user.uid, setExersicesArray);
  useEffect(() => {
    GetUserWorkout(workoutId, user.uid, setExersicesArray);
  }, []);
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
        <TextInput
          placeholder="ange kod:"
          onChangeText={(text) => setkod(text)}
        />

        <Button
          title="använd Tränings Pass"
          onLongPress={() => console.log('här', exersicesArray)}
          onPress={() => {
            // här är det knas
            console.log('work id', workoutId);
            //console.log('work id', workoutTitle);
            //GetUserWorkout(workoutId, user.uid, setExersicesArray);
            //console.log('exer', exersicesArray);
            //AddWorkoutSession(user.email, kod, exersicesArray);
            setModalVisible(false);
            //navigation.navigate('start_workout', { accses: kod });
          }}
        />
      </View>
    </Modal>
  );
};

const WorkoutItem = ({ modalVisible, setModalVisible, itemTitle, itemId }) => {
  const { user } = useContext(AuthContext);
  const [ary, setAry] = useState();
  const ary1 = [];
  const [exersicesArray, setExersicesArray] = useState([]);
  const navigation = useNavigation();

  const [kod, setkod] = useState('');

  return (
    <TouchableOpacity
      onLongPress={() => {
        GetUserWorkout(itemId, user.uid, setExersicesArray, exersicesArray);
        console.log('här', itemId);
        setkod(itemId);
      }}
      onPress={() => {
        console.log('text1', kod);
        console.log('ary', exersicesArray);
        AddWorkoutSession(user.email, itemId, exersicesArray);
        setModalVisible(true);
      }}
    >
      {/* <EnterNameModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        //exersicesArray={exersicesArray}
        //workoutId={itemId}
        workoutTitle={itemTitle}
      /> */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <View style={styles.modal}>
          {/* <TextInput
            placeholder="ange kod:"
            onChangeText={(text) => setkod(text)}
          /> */}
          <Text>Tränings kod</Text>
          <Text>{kod}</Text>

          <Button
            title="Gå vidare till träning"
            onPress={() => {
              console.log('text ny', kod);
              setModalVisible(false);
              navigation.navigate('start_workout', { accses: kod });
            }}
          />
        </View>
      </Modal>
      <View style={styles.workout_item}>
        <Text style={styles.workout_item_text}>{itemTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function Workout({ kod }) {
  const { user } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [enterWorkoutCode, setEnterWorkoutKode] = useState('');
  const [anotherModal, setAnotherModal] = useState(false);

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
        <Button
          title="Abslut till träning"
          onPress={() => setAnotherModal(true)}

          //onPress={() => navigation.navigate('start_workout', { accses: kod })}
        />
        <Button
          title="skapa Träning"
          onPress={() => navigation.navigate('Create_Workout')}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={anotherModal}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <View style={styles.modal}>
          <TextInput
            placeholder="Ange tränings kod"
            onChangeText={(text) => setEnterWorkoutKode(text)}
          />
          <Button
            title="Anslut till träning "
            onPress={() => {
              navigation.navigate('start_workout', {
                accses: enterWorkoutCode,
              });
              setAnotherModal(false);
            }}
          />
        </View>
      </Modal>
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
