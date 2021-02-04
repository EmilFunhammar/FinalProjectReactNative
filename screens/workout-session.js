import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Button, SectionList } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Auth, AuthContext } from '../Context/AuthContext';
import {
  SaveUser,
  SaveUserWorkOut,
  GetUserWorkouts,
  GetOneUserWorkout,
  WorkoutSession,
  ListenToTheWorkout2,
  ListenToTheWorkout1,
} from '../Context/FIrebaseContext';

export default function WorkoutSession1({ route, navigation }) {
  const { user } = useContext(AuthContext);
  const { accses } = route.params;

  //const [array, setArray] = useState(data);

  const [exersicesArray, setExersicesArray] = useState([]);

  useEffect(() => {
    //
    //
    //
    //
    // accses
    ListenToTheWorkout2('Ida', setExersicesArray);
  }, []);
  return (
    <View style={styles.container}>
      {/* <Button
        title="read"
        onPress={() => ListenToTheWorkout2('Ida', setExersicesArray)}
      /> */}

      <SectionList
        style={{ width: '100%' }}
        //sections={[{ exercise: 'TYP AV meil ÖVNING', data: exersicesArray }]}
        sections={exersicesArray}
        renderItem={({ index, item }) => {
          console.log('item', item);
          return <Item item={item} index={index} />;
        }}
        renderSectionHeader={({ section }) => {
          console.log('section', section);
          return <Text style={styles.exercise}>{section.exersice}</Text>;
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
const Item = ({ item, index }) => (
  <View style={styles.exerciseItem}>
    {/* <Text style={styles.exercise}>{exersices.exersice}</Text> */}
    {/* {exersicesArray.map(
      (element, value) => {
        console.log('el', { value });
      } */}

    {/* <Button title="emil" onPress={() => console.log(index)} /> */}
    <RenderUsers item={item} index={index} />
  </View>
);

const RenderUsers = ({ item, index }) => {
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

          <Text style={{ marginLeft: 8 }}>{item.user}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <NegativSignView />
        <View>
          <Text>sets</Text>
          <Text>3/{item.reps}</Text>
        </View>
        <PlusSignView />
        <View style={{ flexDirection: 'row' }}>
          <NegativSignView />
          <View>
            <Text>reps</Text>
            <Text>3/{item.reps}</Text>
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
    backgroundColor: '#3F7134',
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
