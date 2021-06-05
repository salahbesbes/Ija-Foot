import React, {useState, useEffect} from 'react';
import {
  Switch,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from 'react-native';
import useAvailableForMatch from '../hooks/useAvailableForMatch';

import LocationPicker from './LocationPicker';
import ToggleButton from './ToggleButton';


const FindMatchForm = ({modalState, setModalState}) => {
  const {user, updateAvailability} = useAvailableForMatch();

  const [isEnabled, setIsEnabled] = useState(false);
  const [location, setLocation] = useState(undefined);
  const [isMotorized, setIsMotorized] = useState(false);
  const [descriptionText, setDescriptionText] = useState('');
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const toggleMotorized = () => setIsMotorized(prevState => !prevState);

  useEffect(() => {
    if (user) {
      const data = user.availabilityData || {};
      setIsEnabled(user.isAvailable ? true : false);
      setLocation(data.location);
      setIsMotorized(data.isMotorized || false);
      setDescriptionText(data.description);
    }
  }, [user]);

  const saveAvailability = () => {
    const data = {
      location: location || '',
      isMotorized: isMotorized,
      description: descriptionText || '',
    };
    updateAvailability(isEnabled, data);
    setModalState(!modalState);
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
        <View style={{flexDirection: 'row'}}>
          <LocationPicker
            location={location}
            onLocationChange={setLocation}
            disabled={!isEnabled}
          />
          <ToggleButton
            displayText="Motorized"
            isEnabled={isMotorized}
            setIsEnabled={toggleMotorized}
            disabled={!isEnabled}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={descriptionText}
          onChangeText={setDescriptionText}
          editable={isEnabled}
        />
      </View>
      <View style={styles.buttonsView}>
        <Pressable
          style={[styles.button, styles.buttonCancel]}
          onPress={() => setModalState(!modalState)}>
          <Text style={styles.textStyle}>Cancel</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonSave]}
          onPress={saveAvailability}>
          <Text style={styles.textStyle}>Save</Text>
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  body: {
    marginTop: 25,
    marginBottom: 30,
  },
  input: {
    marginTop: 16,
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
