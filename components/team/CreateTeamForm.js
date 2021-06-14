import React, {useState} from 'react';
import {TextInput, Button} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';
import DatePicker from './DatePicker';
import LocationPicker from '../LocationPicker';
import {ScrollView} from 'react-native';
import {teamActions} from '../../stateManager/actions/team-A';
import {useCreateTeam} from '../../hooks/useCreateTeam';

const CreateForm = props => {
  const [teamName, setTeamName] = useState('');
  const [stadium, setStadium] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const {mv, raisedInput, firstElement, textButton} = useTheme();

  const [formDate, setFormDate] = useState(null);
  const {teamDispatch, loading, error, createTeam} = useCreateTeam();

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
      date: formDate,
    };
    createTeam(teamData);
    props?.hideModal();
  };

  return (
    <ScrollView contentContainerStyle={{alignItems: 'center'}}>
      <TextInput
        style={[raisedInput, {width: '100%'}, mv, firstElement]}
        onFocus={() => {}}
        label={error ? 'some Error occured' : 'team Name'}
        value={teamName}
        mode="outlined"
        error={error}
        onChangeText={setTeamName}
      />
      <TextInput
        style={[raisedInput, {width: '100%'}, mv]}
        onFocus={() => {}}
        label={error ? 'some Error occured' : 'Stadium'}
        value={stadium}
        mode="outlined"
        error={error}
        onChangeText={setStadium}
      />
      <TextInput
        style={[raisedInput, {width: '100%'}, mv]}
        onFocus={() => {}}
        onChangeText={setDescription}
        value={description}
        mode="outlined"
        error={error}
        label={error ? 'some Error occured' : 'Description'}
      />

      <DatePicker formDate={formDate} setFormDate={setFormDate} />
      <LocationPicker location={location} onLocationChange={setLocation} />
      <Button
        style={[mv]}
        uppercase
        mode="contained"
        loading={loading}
        labelStyle={[textButton]}
        icon="update"
        onPress={() => {
          submitCreateTeam();
        }}>
        Create Team
      </Button>
    </ScrollView>
  );
};
export default CreateForm;
