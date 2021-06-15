import React, {useState, useEffect} from 'react';
import {StyleSheet, Pressable, View} from 'react-native';
import useAvailableForMatch from '../hooks/useAvailableForMatch';
import {Switch, Checkbox, TextInput, Text, Button} from 'react-native-paper';
import LocationPicker from './LocationPicker';
import ToggleButton from './ToggleButton';
import {useTheme} from '@react-navigation/native';

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
  const {mv, raisedInput} = useTheme();
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Make yourself available for teams to invite you
        </Text>
        <Switch value={isEnabled} onValueChange={toggleSwitch} />
      </View>
      <View style={styles.body}>
        <LocationPicker
          location={location}
          onLocationChange={setLocation}
          disabled={!isEnabled}
        />

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Checkbox
            status={isMotorized ? 'checked' : 'unchecked'}
            onPress={() => {
              setIsMotorized(!isMotorized);
            }}
            disabled={!isEnabled}
          />
          <Text> Motorized ? </Text>
        </View>
        <TextInput
          style={[raisedInput, {width: '100%'}, mv]}
          onFocus={() => {}}
          label={'Description'}
          value={descriptionText}
          mode="outlined"
          onChangeText={setDescriptionText}
          editable={isEnabled}
        />
      </View>
      <View style={styles.buttonsView}>
        <Button mode="outlined" onPress={() => setModalState(!modalState)}>
          cancel
        </Button>
        <Button mode="contained">save</Button>
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
