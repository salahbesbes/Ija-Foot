import React, {useState} from 'react';
import {
  Switch,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from 'react-native';

import LocationPicker from './LocationPicker';

const FindMatchForm = ({modalState, setModalState}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [location, setLocation] = useState(undefined);
  const [descriptionText, setDescriptionText] = useState('');
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const changeLocation = loc => {
    console.log('state parentForm: ' + location);
    setLocation(loc);
  };

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {' '}
          Make yourself available for teams to invite you{' '}
        </Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={styles.switch}
        />
      </View>
      <View style={styles.body}>
        <LocationPicker location={location} onLocationChange={changeLocation} />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={descriptionText}
          onChange={e => setDescriptionText(e.value)}
        />
        <TextInput style={styles.input} />
      </View>
      <View style={styles.buttonsView}>
        <Pressable
          style={[styles.button, styles.buttonSave]}
          onPress={() => setModalState(!modalState)}>
          <Text style={styles.textStyle}>Save</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonCancel]}
          onPress={() => setModalState(!modalState)}>
          <Text style={styles.textStyle}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    padding: 8,
  },
  switch: {
    flex: 1,
  },
  headerText: {
    flex: 3,
    marginRight: 50,
  },
  body: {
    marginTop: 20,
  },
  input: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#777',
  },
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
    padding: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
  },
  buttonCancel: {
    backgroundColor: '#d6d6d6',
  },
  buttonSave: {
    backgroundColor: '#2196F3',
    width: 95,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default FindMatchForm;
