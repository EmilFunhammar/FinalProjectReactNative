import React, { useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { View, Text, Button, StyleSheet, Modal } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
//import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import {
  ListenToTheWorkout,
  AddUserToWorkout,
} from '../Context/FIrebaseContext';
import { useEffect } from 'react';

export default function StartWorkout({ route }) {
  const [userArray, setUserArray] = useState([]);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [accsesCode, setAccsesCode] = useState('');
  const { accses } = route.params;

  useEffect(() => {
    AddUserToWorkout(accses, user.email);
    ListenToTheWorkout('skräp', accses, setUserArray);
  }, []);
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          {/* <Text
            style={{
              fontWeight: 'bold',
              fontSize: 50,
              marginLeft: 10,
            }}
          >
            {accses}
          </Text> */}
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
          >
            <View style={styles.modal}>
              <TextInput
                placeholder="Enter accses code"
                onChangeText={(text) => setAccsesCode(text)}
              />
              <Button
                title="submit"
                onPress={() => {
                  console.log(accsesCode);
                  AddUserToWorkout(accsesCode, user.email);
                  ListenToTheWorkout('skräp', accsesCode, setUserArray);
                  setModalVisible(false);
                }}
              />
            </View>
          </Modal>
          {/* {userArray.map(({ user1 }) => console.log('emil'))} */}
        </View>
        {/* <Text style={styles.participant_text}>Participant:</Text> */}
        <View style={styles.participant_view}>
          {userArray.map((element, index) => (
            <ParticipantView key={index} element={element} />
          ))}

          {/* <Button
            title="check array"
            onPress={() => console.log('arrat i start', userArray)}
          /> */}
          {/* <ParticipantView />
          <ParticipantView />
          <ParticipantView /> */}
        </View>
      </View>
      <View style={styles.buttons_view}>
        {/* <TextInput
          style={styles.textinput}
          placeholder="emil"
          onChangeText={(text) => console.log(text)}
        /> */}
        {/* <TouchableOpacity
          style={styles.buttons}
          onPress={() => console.log('invite friend')}
        >
          <Text style={styles.buttons_text}>invite friends</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => {
            console.log('acses', accsesCode);
            navigation.navigate('Workout_session', { accses: accses });
            // add number of players to firestore
          }}
        >
          <Text style={styles.buttons_text}>Start workout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const ParticipantView = ({ element }) => {
  return (
    <>
      <Text style={styles.participant_text}>{element}</Text>
      <View style={styles.line_view} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  buttons: {
    elevation: 8,
    backgroundColor: '#3F7134',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 12,
    marginLeft: 10,
  },
  buttons_text: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  buttons_view: {
    width: '100%',
    marginBottom: 50,
  },
  participant_text: {
    fontSize: 18,
    marginTop: 10,
  },
  participant_view: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  line_view: {
    marginTop: 3,
    backgroundColor: 'black',
    width: '100%',
    height: 3,
  },
  textinput: {
    width: '100%',
    //elevation: 8,
    borderColor: '#3F7134',
    borderWidth: 5,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 12,
    marginBottom: 10,
    fontSize: 18,
  },
  modal: {
    position: 'absolute',
    top: '45%',
    left: '15%',
    backgroundColor: 'gray',
    height: 120,
    width: 300,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
