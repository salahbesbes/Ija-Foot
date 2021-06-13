import React, {useContext, useEffect, useState} from 'react';
import {Text, SafeAreaView, View} from 'react-native';
import {ChatRoom} from '../components/chat/chatRoom';
import {AppStateContext} from '../stateProvider';

const MyTeam = ({navigation}) => {
  const {authContext, teamContext} = useContext(AppStateContext);
  const [authState, userDispatch] = authContext;
  const [teamState, teamDispatch] = teamContext;
  const {team} = teamState;
  const {user} = authState;
  const [members, setmembers] = useState([]);
  useEffect(() => {
    setmembers(team.members);
  }, [team]);
  return (
    <>
      <ChatRoom navigation={navigation} />
    </>
  );
};

export default MyTeam;
