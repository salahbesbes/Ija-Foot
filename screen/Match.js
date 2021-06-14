import React from 'react';
import {Text, SafeAreaView} from 'react-native';
import {ChatRoom} from '../components/chat/chatRoom';
import {MatchRoom} from '../components/chat/MatchRoom';

const Match = ({navigation}) => {
  return <MatchRoom navigation={navigation} />;
};

export default Match;
