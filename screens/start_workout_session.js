import React, { useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import { ListenToTheWorkout } from '../Context/FIrebaseContext';
import { useEffect } from 'react';
import firebase, { firestore } from 'firebase';

export default function StartWorkout() {
  const [userArray, setUserArray] = useState([]);
  const navigation = useNavigation();

  // function getUsers() {
  //   firebase
  //     .firestore()
  //     .collection('WorkoutSession')
  //     .doc('YMOa4tregVEiNFbGp5d5')
  //     .onSnapshot(
  //       {
  //         // Listen for document metadata changes
  //         includeMetadataChanges: true,
  //       },
  //       function (doc) {
  //         var user = {
  //           user1: doc.data().user1,
  //           user2: doc.data().user2,
  //           user3: doc.data().user3,
  //         };

  //         setUserArray(user);
  //       }
  //     );
  //ListenToTheWorkout('YMOa4tregVEiNFbGp5d5', setUserArray);
  //}

  useEffect(() => {
    ListenToTheWorkout('YMOa4tregVEiNFbGp5d5', setUserArray);
    console.log('emil', userArray);
  }, []);
  //   firebase
  //     .firestore()
  //     .collection('WorkoutSession')
  //     .onSnapshot((snapshot) => {
  //       var users = { user1: snapshot.docs.map((doc) => doc.data().user1) };
  //       //setUserArray(snapshot.docs.map((doc) => doc.data().user1))
  //       setUserArray(users);
  //     });
  // }, []);
  // useEffect(() => {
  //   getUsers();
  // });
  return (
    <View style={styles.container}>
      <View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 50,
              marginLeft: 10,
            }}
          >
            workout name
          </Text>
          {/* {userArray.map(({ user1 }) => console.log('emil'))} */}
        </View>
        {/* <Text style={styles.participant_text}>Participant:</Text> */}
        <View style={styles.participant_view}>
          {userArray.map((element, index) => (
            <ParticipantView key={index} element={element} />
          ))}

          <Button
            title="check array"
            onPress={() => console.log('arrat i start', userArray)}
          />
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
            navigation.navigate('Workout_session');
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
      <View style={styles.line_view}></View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
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
});
