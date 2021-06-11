import React, {useContext, useEffect, useState} from 'react';
import {Text, SafeAreaView, View} from 'react-native';
import {ChatRoom} from '../components/chat/chatRoom';
import {AppStateContext} from '../stateProvider';

const MyTeam = () => {
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
      <View>
        {members?.map(el => {
          <Text> {el.nickName} </Text>;
        })}
      </View>
      <ChatRoom />
    </>
  );
};

export default MyTeam;
