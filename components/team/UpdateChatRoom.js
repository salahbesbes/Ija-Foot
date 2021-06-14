import React, {useState} from 'react';
import {IconButton, TextInput, Button} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';
import CustumModal from '../CustomModal';
import DatePicker from '../team/DatePicker';
import LocationPicker from '../LocationPicker';
import {ScrollView} from 'react-native';
import {useAdmin} from '../../hooks/useAdmin';
import {teamActions} from '../../stateManager/actions/team-A';

const UpdateForm = props => {
  const [teamName, setTeamName] = useState('');
  const [stadium, setStadium] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const {mv, raisedInput, firstElement, textButton} = useTheme();

  const [formDate, setFormDate] = useState(null);

  const {error, loading, teamDispatch, updateDeatails} = useAdmin();

  const submitUpdateTeam = () => {
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
    updateDeatails(teamData);
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
          submitUpdateTeam();
        }}>
        Update Details
      </Button>
    </ScrollView>
  );
};

const renderForm = props => <UpdateForm {...props} />;

const UpdateChatRoom = () => {
  const {colors, widthSc} = useTheme();
  const trigerButton = props => (
    <IconButton
      style={{position: 'absolute', right: 10, top: 5}}
      icon="info"
      size={20}
      color={colors.accent}
      {...props}
    />
  );

  return (
    <CustumModal
      renderForm={renderForm}
      trigerButton={props => trigerButton(props)}
    />
  );
};

export default UpdateChatRoom;
