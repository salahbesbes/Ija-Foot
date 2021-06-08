import React, {useState, useCallback, useEffect} from 'react';
import db from '@react-native-firebase/firestore';

import {Text, View} from 'react-native';
import {GiftedChat, Bubble, Send, InputToolbar} from 'react-native-gifted-chat';
import {useChatRoom} from '../../hooks/useChatRoom';
import {useComponentDidUpdate} from '../../hooks/useLifeCycle';
export function ChatRoom() {
  console.log('chatroom rendred');
  const [roomMessages, setRoomMessages] = useState([]);

  const {ListningOnTeamUpdates, sendMessage, user} =
    useChatRoom(setRoomMessages);
  useEffect(() => {
    ListningOnTeamUpdates();
    return ListningOnTeamUpdates;
  }, [ListningOnTeamUpdates]);

  const onSend = useCallback(
    (callBackMessages = []) => {
      sendMessage(callBackMessages);
      // setRoomMessages(previousMessages =>
      //   GiftedChat.append(previousMessages, callBackMessages),
      // );
    },
    [sendMessage],
  );

  return (
    <GiftedChat
      messages={roomMessages}
      onSend={onSend}
      user={{
        _id: user.uid,
        name: user.fullName,
        avatar: user.avatar,
      }}
      isTyping
      onLongPress={() => {
        console.log('long Press on message');
      }}
      showUserAvatar
      alwaysShowSend
      scrollToBottom
      onLongPressAvatar={() => {
        console.log('long press on avatar  ');
      }}
      onQuickReply={rep => {
        console.log(rep, 'quick reply pressed');
      }}
    />
  );
}
