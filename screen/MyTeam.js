import React from 'react';
import {Text, SafeAreaView, View} from 'react-native';
import {ChatRoom} from '../components/chat/chatRoom';

const MyTeam = () => {
  return (
    <>
      <View>
        <Text> this is a header </Text>
      </View>
      <ChatRoom />
    </>
  );
};

export default MyTeam;
