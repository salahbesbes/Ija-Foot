import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Button,
} from 'react-native';
import {useCreateTeam} from '../../hooks/useCreateTeam';
import {teamActions} from '../../stateManager/actions/team-A';
import DatePicker from './DatePicker';

const CreateTeamForm = ({setModalVisible}) => {
  const [teamName, setTeamName] = useState('');
  const [stadium, setStadium] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [formDate, setFormDate] = useState(undefined);
  const {teamDispatch, createTeam, teamError} = useCreateTeam();
  const submitCreateTeam = () => {
    if (teamName === '') {
      teamDispatch(teamActions.failure('pls set a name'));
      return;
    }
    const teamData = {
      teamName,
      stadium,
      location,
      description,
      formDate,
    };
    createTeam(teamData);
    setModalVisible(false);
  };

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
        <DatePicker formDate={formDate} setFormDate={setFormDate} />
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
