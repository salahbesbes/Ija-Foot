import React, {useState} from 'react';
import {IconButton, TextInput, Button} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';
import CustumModal from '../CustomModal';
import DatePicker from './DatePicker';
import LocationPicker from '../LocationPicker';
import {ScrollView, Pressable, View, Image, StyleSheet} from 'react-native';
import {useAdmin} from '../../hooks/useAdmin';
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

const renderForm = props => <CreateForm {...props} />;

const CreateTeam = ({navigation}) => {
  const {colors, widthSc, heightSc} = useTheme();
  const trigerButton = props => (
    <Pressable
      {...props}
      style={styles.openModal}
      onPress={() => {
        //console.log('pressed team button, user: ' + JSON.stringify(user));
        if (user.teamId) {
          navigation.navigate('MyTeam');
        } else {
          setModalVisible(true);
        }
      }}>
      <View>
        <Image
          style={styles.image}
          source={require('../../assets/icons/icons8-football-team-100.png')}
        />
      </View>
      {/* <Button
      style={{position: 'absolute', bottom: 0, right: 100}}
      icon="info"
      size={20}
      mode="contained"
      color={colors.accent}
      {...props}>
      create Team
    </Button> */}
    </Pressable>
  );

  return (
    <CustumModal
      renderForm={renderForm}
      trigerButton={props => trigerButton(props)}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    //top: -27,
    width: 80,
    height: 80,
    //backgroundColor: '#ffffee',
    borderRadius: 36,
  },
  openModal: {
    elevation: 5,
    backgroundColor: '#F0A73E',
    top: -27,
    width: 80,
    height: 80,
    borderRadius: 36,
  },
});

export default CreateTeam;
