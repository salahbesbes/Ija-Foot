import React, {useContext, useEffect, useState} from 'react';
import {
  IconButton,
  TextInput,
  Button,
  Card,
  Title,
  Paragraph,
} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';
import CustumModal from '../CustomModal';
import DatePicker from '../team/DatePicker';
import LocationPicker from '../LocationPicker';
import {ScrollView} from 'react-native';
import {useAdmin} from '../../hooks/useAdmin';
import {teamActions} from '../../stateManager/actions/team-A';
import {AppStateContext} from '../../stateProvider';
import {useCreateMatch} from '../../hooks/useCreateMatch';

const UpdateForm = ({navigation, hideModal}) => {
  const [teamName, setTeamName] = useState('');
  const [stadium, setStadium] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [formDate, setFormDate] = useState(null);

  const {mv, raisedInput, firstElement, textButton} = useTheme();

  const {teamContext} = useContext(AppStateContext);
  const [teamState, teamDispatch] = teamContext;
  // const {team} = teamState;
  const {loading, updateDeatails, team} = useAdmin({
    teamState,
    teamDispatch,
  });
  const {createMatch, exitFromRoom, user} = useCreateMatch();

  useEffect(() => {
    if (team.uid) {
      setLocation(team.location);
      setTeamName(team.teamName);
      setStadium(team.stadium);
      setDescription(team.description);
      setFormDate(team.date?.toDate()?.toLocaleString());
    }
  }, [team]);
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
    hideModal();
    navigation.navigate('Home');
  };

  //todo: listeng on update change
  // todo: update local state when player is ckiked from team
  //  profile + card + name of the shcreens

  return (
    <>
      {team.admins.includes(user.uid) ? (
        <ScrollView>
          <TextInput
            style={[raisedInput, {width: '100%'}, mv, firstElement]}
            onFocus={() => {}}
            label={'team Name'}
            value={teamName}
            mode="outlined"
            onChangeText={setTeamName}
          />
          <TextInput
            style={[raisedInput, {width: '100%'}, mv]}
            onFocus={() => {}}
            label={'Stadium'}
            value={stadium}
            mode="outlined"
            onChangeText={setStadium}
          />
          <TextInput
            style={[raisedInput, {width: '100%'}, mv]}
            onFocus={() => {}}
            onChangeText={setDescription}
            value={description}
            mode="outlined"
            label={'Description'}
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
          <Button
            style={[mv, {marginTop: 30}]}
            color="red"
            uppercase
            mode="outlined"
            loading={loading}
            labelStyle={[textButton]}
            icon="logout"
            onPress={() => {
              exitFromRoom();
              hideModal();
              navigation.navigate('Home');
            }}>
            exist
          </Button>
        </ScrollView>
      ) : (
        <Card style={{marginVertical: 10}}>
          <Card.Title title={`${team?.teamName}`} subtitle={team.location} />
          {team?.date && (
            <Card.Content>
              <Title>{team?.date?.toDate()?.toLocaleString()}</Title>
              <Paragraph>{team?.description}</Paragraph>
              <Button
                style={[mv, {marginTop: 30}]}
                color="red"
                uppercase
                mode="outlined"
                loading={loading}
                labelStyle={[textButton]}
                icon="logout"
                onPress={() => {
                  exitFromRoom();
                  hideModal();
                  navigation.navigate('Home');
                }}>
                exist
              </Button>
            </Card.Content>
          )}
        </Card>
      )}
    </>
  );
};

const UpdateChatRoom = ({navigation}) => {
  const renderForm = props => <UpdateForm navigation={navigation} {...props} />;
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
