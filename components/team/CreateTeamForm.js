import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Switch,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  ScrollView,
  Button,
} from 'react-native';
import {useCreateTeam} from '../../hooks/useCreateTeam';
import {actionCreators} from '../../stateManager/actions/auth-A';
import DatePicker from './DatePicker';

const CreateTeamForm = ({setModalVisible}) => {
  const [teamName, setTeamName] = useState('');
  const [stadium, setStadium] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(undefined);
  const {dispatch, createTeam, teamError, team} = useCreateTeam();
  const submitCreateTeam = () => {
    if (teamName === '') {
      dispatch(actionCreators.failure('pls set a name'));
      return;
    }
    const teamData = {
      teamName,
      stadium,
      location,
      description,
      date,
    };
    createTeam(teamData);
  };

  // todo: convert date to timestump that firebase understand
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Create Team</Text>
        <Text style={{color: 'red', flex: 1}}>{teamError}</Text>
        <Button style={{flex: 1}} title="Create" onPress={submitCreateTeam} />
      </View>

      <ScrollView>
        <TextInput
          style={styles.input}
          placeholder="Team Name"
          value={teamName}
          onChangeText={setTeamName}
        />
        <TextInput
          style={styles.input}
          placeholder="Stadium Name"
          value={stadium}
          onChangeText={setStadium}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <DatePicker date={date} setDate={setDate} />
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
        />
      </ScrollView>
    </View>
  );
};
export default CreateTeamForm;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    padding: 8,
  },
  switch: {
    flex: 1,
  },
  headerText: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    marginTop: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#777',
  },
});
