import React, {useState, useCallback, useEffect} from 'react';

import {GiftedChat} from 'react-native-gifted-chat';
import {useChatRoom} from '../../hooks/useChatRoom';
export function ChatRoom() {
  const [roomMessages, setRoomMessages] = useState([]);

  const {sendMessage, ListningOnTeamUpdates, user} =
    useChatRoom(setRoomMessages);
  useEffect(() => {
    ListningOnTeamUpdates(setRoomMessages);
    return () => ListningOnTeamUpdates(setRoomMessages);
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
