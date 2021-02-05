import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Button, SectionList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../Context/AuthContext';
import { ListenToTheWorkout2, ChangeFinish } from '../Context/FIrebaseContext';

export default function WorkoutSession1({ route }) {
  const { user } = useContext(AuthContext);
  const { accses } = route.params;

  const [exersicesArray, setExersicesArray] = useState([]);

  useEffect(() => {
    // accses
    ListenToTheWorkout2('Ida', setExersicesArray);
  }, []);
  return (
    <View style={styles.container}>
      <SectionList
        style={{ width: '100%' }}
        //sections={[{ exercise: 'TYP AV meil ÖVNING', data: exersicesArray }]}
        sections={exersicesArray}
        renderItem={({ index, item }) => {
          console.log('item emil', item);
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
    <RenderUsers item={item} index={index} />
  </View>
);

const RenderUsers = ({ item, index }) => {
  console.log('finish', item.finish);
  let value = item.finish;
  return (
    <View style={styles.setsAndReps}>
      <View style={styles.users}>
        <View style={styles.user_name_view}>
          <TouchableOpacity
            onPress={() => {
              //ChangeFinish();
              console.log('change');
            }}
          >
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                ...styles.checkBox,
                backgroundColor: value ? 'green' : 'red',
              }}
            />
          </TouchableOpacity>
          <Text style={{ marginLeft: 8 }}>{item.user}</Text>
        </View>
      </View>
      <View style={styles.flexDirection_row}>
        <NegativSignView />
        <View>
          <Text>sets</Text>
          <Text>3/{item.reps}</Text>
        </View>
        <PlusSignView />
        <View style={styles.flexDirection_row}>
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
  flexDirection_row: {
    flexDirection: 'row',
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
    backgroundColor: 'yellow',
    height: 20,
    width: 20,
    borderRadius: 20,
    marginLeft: 5,
  },
  user_name_view: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
