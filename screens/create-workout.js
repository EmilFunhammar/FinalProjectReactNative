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
        <View style={styles.create_workout_add_and_remove}>
          <Text style={{ fontSize: 30 }}>-</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.create_workout_number}>
        <Text style={{ fontSize: 22 }}>{setNumber}</Text>
      </View>
      <TouchableOpacity
        onPress={() => setSetNumber(setNumber + 1)}
        activeOpacity={0.8}
      >
        <View
          style={{
            ...styles.create_workout_add_and_remove,
            marginRight: 10,
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
        <View style={styles.create_workout_add_and_remove}>
          <Text style={{ fontSize: 30 }}>-</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.create_workout_number}>
        <Text style={{ fontSize: 22 }}>{repNumber}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          console.log('on press ');
          setRepNumber(repNumber + 1);
        }}
        // onPress={() => setRepNumber((prev) => prev + 1)}
        activeOpacity={0.8}
      >
        <View
          style={{
            ...styles.create_workout_add_and_remove,
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
      <Text>text {textInputValue}</Text>
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

  const SetValue = (feild, newValue, index) => {
    let updatedWorkoutValue = [...workOutItem];
    updatedWorkoutValue[index] = {
      // kopierar bara den med det index jag har från keyExtraction
      ...updatedWorkoutValue[index],
      [feild]: newValue,
    };
    console.log('updatedValue', updatedWorkoutValue);

    setWorkOutItem(updatedWorkoutValue);
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
      <Text>text {JSON.stringify(workOutItem)}</Text>
      <Button
        title="remove workout"
        onPress={() => setWorkOutItem(workOutItem.splice(1))}
      ></Button>
      <Button
        title="add WorkOut"
        onPress={() => console.log('add WorkOut')}
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
