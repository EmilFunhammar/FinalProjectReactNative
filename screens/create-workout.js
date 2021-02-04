import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  FlatList,
  Alert,
  Modal,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
//import { set } from 'react-native-reanimated';
import { useState, useContext, useEffect } from 'react/cjs/react.development';
import { SaveUserWorkOut } from '../Context/FIrebaseContext';
import { AuthContext } from '../Context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const SetNumberView = ({ setSetNumber, setNumber }) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => setSetNumber(setNumber - 1)}
        activeOpacity={0.8}
      >
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            ...styles.create_workout_add_and_remove,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        >
          <Text style={styles.text_minus_and_plus_sign}>-</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.create_workout_number}>
        <Text style={styles.text_set_and_rep}>Reps</Text>
        <Text style={styles.text_set_and_rep_value}>{setNumber}</Text>
      </View>
      <TouchableOpacity
        onPress={() => setSetNumber(setNumber + 1)}
        activeOpacity={0.8}
      >
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            ...styles.create_workout_add_and_remove,
            borderBottomRightRadius: 10,
            borderTopRightRadius: 10,
            marginRight: -5,
          }}
        >
          <Text style={styles.text_minus_and_plus_sign}>+</Text>
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
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            ...styles.create_workout_add_and_remove,
            borderBottomLeftRadius: 10,
            borderTopStartRadius: 10,
          }}
        >
          <Text style={styles.text_minus_and_plus_sign}>-</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.create_workout_number}>
        <Text style={styles.text_set_and_rep}>Sets</Text>
        <Text style={styles.text_set_and_rep_value}>{repNumber}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          setRepNumber(repNumber + 1);
        }}
        activeOpacity={0.8}
      >
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            ...styles.create_workout_add_and_remove,
            borderBottomRightRadius: 10,
            borderTopRightRadius: 10,
            marginRight: 10,
          }}
        >
          <Text style={styles.text_minus_and_plus_sign}>+</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const WorkOutTextInputView = ({ setTextInputValue, textInputValue, id }) => {
  return (
    <>
      <TextInput
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ marginLeft: 5 }}
        onChangeText={(text) => setTextInputValue(text)}
        placeholder="Enter workout exercise:"
        placeholderTextColor="black"
      />
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
          <RepNumberView setRepNumber={setRepNumber} repNumber={repNumber} />
          <SetNumberView setSetNumber={setSetNumber} setNumber={setNumber} />
        </View>
      </View>
    </View>
  );
};

const WorkOutFlatList = () => {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);

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
    //console.log('WorkItem array', workOutItem);
  };

  const SetValue = (feild, newValue, index) => {
    let updatedWorkoutValue = [...workOutItem];
    updatedWorkoutValue[index] = {
      // kopierar bara den med det index jag har från keyExtraction
      ...updatedWorkoutValue[index],
      [feild]: newValue,
    };
    //workOutItem verkar vara 1 efter???
    //console.log('updatedValue', updatedWorkoutValue);
    setWorkOutItem(updatedWorkoutValue);
    //console.log('WorkoutArray', workOutItem);
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
      <FlatList
        style={styles.flatlist}
        data={workOutItem}
        renderItem={({ item, index }) => (
          <CreateWorkoutItem
            setRepNumber={(newValue) => SetRepNumber(newValue, index)}
            setSetNumber={(newValue) => setSetNumber(newValue, index)}
            setTextInputValue={(newValue) => setTextInputValue(newValue, index)}
            repNumber={item.repNumber}
            setNumber={item.setNumber}
            textInputValue={item.textInputValue}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <EnterNameModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        workOutItem={workOutItem}
      />
      <View style={{ marginBottom: 20 }}>
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
        <Button title="remove workout" onPress={() => RemoveExersice()} />
        <Button
          title="add WorkOut"
          onPress={() => {
            console.log('add Workout121');
            //SaveUserWorkOut(user.uid, workOutItem);
            setModalVisible(true);
            //console.log('emil');
            //navigation.navigate('Choose_Workout');
            // navigation här
          }}
        />
      </View>
    </>
  );
};

const EnterNameModal = ({ modalVisible, setModalVisible, workOutItem }) => {
  const [workoutName, setWorkoutName] = useState('');
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

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
          placeholder="Enter Workout Name:"
          onChangeText={(text) => {
            setWorkoutName(text);
          }}
        />
        <Button
          title="Add workout"
          onPress={() => {
            SaveUserWorkOut(user.uid, workOutItem, workoutName);
            setModalVisible(false);
            navigation.navigate('Choose_Workout');
          }}
        />
      </View>
    </Modal>
  );
};

export default function Create_Workout() {
  return (
    <View style={styles.container}>
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
  },
  card_view: {
    marginTop: 10,
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: 'gray',
  },
  flatlist: {
    backgroundColor: '#3F7134',
    width: '100%',
  },
  modal: {
    position: 'absolute',
    top: '45%',
    left: '15%',
    backgroundColor: 'yellow',
    height: 120,
    width: 300,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_minus_and_plus_sign: {
    fontSize: 30,
  },
  text_set_and_rep: {
    fontSize: 12,
  },
  text_set_and_rep_value: {
    fontSize: 22,
  },
});

// const WorkoutsScrollView = ({}) => {
//   return (
//     <ScrollView style={{ backgroundColor: '#3F7134', width: '100%' }}>
//       <View style={{ justifyContent: 'space-evenly' }}>
//         <Button
//           title="add Exercise"
//           onPress={() => console.log('add exercise')}
//         ></Button>
//         <CreateWorkoutItem></CreateWorkoutItem>

//         <Button
//           title="add WorkOut"
//           onPress={() => console.log('add WorkOut')}
//         ></Button>
//       </View>
//     </ScrollView>
//   );
// };
