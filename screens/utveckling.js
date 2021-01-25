import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { AuthContext } from '../Context/AuthContext';
import { auth } from '../firebase';
import { db, dbcollection } from '../firebase';
import firebase, { firestore } from 'firebase';

export default function Utvecklingn() {
  const { ReadAuth, user } = useContext(AuthContext);

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
