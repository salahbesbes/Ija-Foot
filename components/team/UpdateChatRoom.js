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

const UpdateForm = props => {
  const [teamName, setTeamName] = useState('');
  const [stadium, setStadium] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [formDate, setFormDate] = useState(null);

  const {mv, raisedInput, firstElement, textButton} = useTheme();

  const {teamContext} = useContext(AppStateContext);
  const [teamState, teamDispatch] = teamContext;
  // const {team} = teamState;
  const {error, loading, updateDeatails, team} = useAdmin({
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
    props?.hideModal();
  };

  //todo: listeng on update change
  // todo: update local state when player is ckiked from team
  //  profile + card + name of the shcreens

  return (
    <ScrollView contentContainerStyle={{alignItems: 'center'}}>
      {team.admins.includes(user.uid) ? (
        <>
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
          <Button
            style={[mv]}
            color="red"
            uppercase
            mode="outlined"
            loading={loading}
            labelStyle={[textButton]}
            icon="logout"
            onPress={() => {
              exitFromRoom();
              props?.hideModal();
            }}>
            exist
          </Button>
        </>
      ) : (
        <Card style={{marginVertical: 10}}>
          <Card.Title title={`${team?.teamName}`} subtitle={team.location} />
          {team?.date && (
            <Card.Content>
              <Title>{team?.date?.toDate()?.toLocaleString()}</Title>
              <Paragraph>{team?.description}</Paragraph>
            </Card.Content>
          )}
        </Card>
      )}
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
