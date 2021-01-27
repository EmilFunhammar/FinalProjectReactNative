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
import { set } from 'react-native-reanimated';
import { useState } from 'react/cjs/react.development';

const SetNumberView = ({ setSetNumber, setNumber }) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => setSetNumber(setNumber - 1)}
        activeOpacity={0.8}
      >
        <View
          style={{
            ...styles.create_workout_add_and_remove,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        >
          <Text style={{ fontSize: 30 }}>-</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.create_workout_number}>
        <Text>Rets</Text>
        <Text style={{ fontSize: 22 }}>{setNumber}</Text>
      </View>
      <TouchableOpacity
        onPress={() => setSetNumber(setNumber + 1)}
        activeOpacity={0.8}
      >
        <View
          style={{
            ...styles.create_workout_add_and_remove,
            borderBottomRightRadius: 10,
            borderTopRightRadius: 10,
            marginRight: -5,
          }}
        >
          <Text style={{ fontSize: 30 }}>+</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const RepNumberView = ({ setRepNumber, repNumber }) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => setRepNumber(repNumber - 1)}
        activeOpacity={0.8}
      >
        <View
          style={{
            ...styles.create_workout_add_and_remove,
            borderBottomLeftRadius: 10,
            borderTopStartRadius: 10,
          }}
        >
          <Text style={{ fontSize: 30 }}>-</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.create_workout_number}>
        <Text>Sets</Text>
        <Text style={{ fontSize: 22 }}>{repNumber}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          setRepNumber(repNumber + 1);
        }}
        activeOpacity={0.8}
      >
        <View
          style={{
            ...styles.create_workout_add_and_remove,
            borderBottomRightRadius: 10,
            borderTopRightRadius: 10,
            marginRight: 10,
          }}
        >
          <Text style={{ fontSize: 30 }}>+</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const WorkOutTextInputView = ({ setTextInputValue, textInputValue, id }) => {
  return (
    <>
      <TextInput
        style={{ marginLeft: 5 }}
        onChangeText={(text) => setTextInputValue(text)}
        placeholder="Enter workout exercise:"
        placeholderTextColor="black"
      ></TextInput>
    </>
  );
};

const CreateWorkoutItem = ({
  setRepNumber,
  setSetNumber,
  setTextInputValue,
  repNumber,
  setNumber,
  textInputValue,
  id,
}) => {
  return (
    <View style={styles.card_view}>
      <View style={styles.create_workout}>
        <WorkOutTextInputView
          setTextInputValue={setTextInputValue}
          textInputValue={textInputValue}
          id={id}
        />

        {/* <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: '15%',
            }}
          >
            Sets
          </Text> */}

        <View style={styles.create_workout_view}>
          <RepNumberView
            setRepNumber={setRepNumber}
            repNumber={repNumber}
          ></RepNumberView>
          <SetNumberView
            setSetNumber={setSetNumber}
            setNumber={setNumber}
          ></SetNumberView>
        </View>
      </View>
    </View>
  );
};

const WorkOutFlatList = () => {
  const [workOutItem, setWorkOutItem] = useState([]);
  //const [repNumber, setRepNumber] = useState(0);
  //const [setNumber, setSetNumber] = useState(0);
  //const [textInputValue, setTextInputValue] = useState();
  //const finshArrat = [];

  const RemoveExersice = () => {
    let updatedValue1 = [...workOutItem];
    updatedValue1.splice(updatedValue1.length - 1, 1);
    //verkar vara 1 efter också
    setWorkOutItem(updatedValue1);
    console.log('WorkItem array', workOutItem);
  };

  const SetValue = (feild, newValue, index) => {
    let updatedWorkoutValue = [...workOutItem];
    updatedWorkoutValue[index] = {
      // kopierar bara den med det index jag har från keyExtraction
      ...updatedWorkoutValue[index],
      [feild]: newValue,
    };
    //workOutItem verkar vara 1 efter???
    console.log('updatedValue', updatedWorkoutValue);
    setWorkOutItem(updatedWorkoutValue);
    console.log('WorkoutArray', workOutItem);
  };

  //newValue och index är vad functionen vill ha när den kallas?
  //men får bara newValue där den deklareras?

  //new value kommer ifrån setRepNumber
  const SetRepNumber = (newValue, index) => {
    SetValue('repNumber', newValue, index);
  };
  const setSetNumber = (newValue, index) => {
    SetValue('setNumber', newValue, index);
  };
  const setTextInputValue = (newValue, index) => {
    SetValue('textInputValue', newValue, index);
  };

  return (
    <>
      <Button
        title="add Exercise"
        onPress={() =>
          // koppierar den från början toma array och lägger till ett object med 3 värden i
          setWorkOutItem([
            ...workOutItem,
            { setNumber: 0, repNumber: 0, textInputValue: '' },
          ])
        }
      />

      <FlatList
        style={{ backgroundColor: '#3F7134', width: '100%' }}
        data={workOutItem}
        renderItem={({ item, index }) => (
          <CreateWorkoutItem
            setRepNumber={(newValue) => SetRepNumber(newValue, index)}
            // setRepNumber={function (newValue) {
            //   return SetRepNumber(newValue, index);
            // }}
            setSetNumber={(newValue) => setSetNumber(newValue, index)}
            setTextInputValue={(newValue) => setTextInputValue(newValue, index)}
            repNumber={item.repNumber}
            setNumber={item.setNumber}
            textInputValue={item.textInputValue}
            id={index}
          ></CreateWorkoutItem>
        )}
        keyExtractor={(item, index) => index.toString()}
      ></FlatList>

      <Button title="remove workout" onPress={() => RemoveExersice()}></Button>
      <Button
        title="add WorkOut"
        onPress={() => {
          console.log('add WorkOut');
          //add to firebase here
        }}
      ></Button>
    </>
  );
};

export default function Create_Workout() {
  return (
    <View style={{ ...styles.container, backgroundColor: 'white' }}>
      <WorkOutFlatList />
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

const WorkoutsScrollView = ({}) => {
  return (
    <ScrollView style={{ backgroundColor: '#3F7134', width: '100%' }}>
      <View style={{ justifyContent: 'space-evenly' }}>
        <Button
          title="add Exercise"
          onPress={() => console.log('add exercise')}
        ></Button>
        <CreateWorkoutItem></CreateWorkoutItem>

        <Button
          title="add WorkOut"
          onPress={() => console.log('add WorkOut')}
        ></Button>
      </View>
    </ScrollView>
  );
};
