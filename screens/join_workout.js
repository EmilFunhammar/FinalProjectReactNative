import React, { useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

export default function joinWorkot() {
  const navigation = useNavigation();
  let workoutCode = '';
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
        </View>
        {/* <Text style={styles.participant_text}>Participant:</Text> */}
        <View style={styles.participant_view}></View>
      </View>
      <View style={styles.buttons_view}>
        <TextInput
          style={styles.textinput}
          placeholder="Workout code"
          onChangeText={(text) => (workoutCode = text)}
        />

        <TouchableOpacity
          style={styles.buttons}
          onPress={() => {
            workoutCode;
          }}
        >
          <Text style={styles.buttons_text}>Join workout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// const ParticipantView = () => {
//   const { user } = useContext(AuthContext);
//   return (
//     <>
//       <Text style={styles.participant_text}>{user.email}</Text>
//       <View style={styles.line_view}></View>
//     </>
//   );
// };

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
    marginEnd: 10,
    marginBottom: 10,
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
