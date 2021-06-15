import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {useMatchRoom} from '../../hooks/useMatchRoom';
import {Divider, Text} from 'react-native-paper';
import FriendList from '../ProfileNav/FriendList';

export function MatchRoom({navigation}) {
  const [matchMessages, setMatchMessages] = useState([]);

  const {
    sendMessage,
    ListenOnMessages,
    user,
    ListenOnMatchDoc,
    listenOnMembersCollection,
    match,
  } = useMatchRoom(setMatchMessages);

  useEffect(() => {
    const unsub = ListenOnMatchDoc();
    return () => unsub();
  }, [ListenOnMatchDoc]);

  useEffect(() => {
    const unsub = listenOnMembersCollection();
    return () => unsub();
  }, [listenOnMembersCollection]);

  useEffect(() => {
    const unsub = ListenOnMessages(setMatchMessages);
    return () => unsub();
  }, [ListenOnMessages]);

  const onSend = useCallback(
    (callBackMessages = []) => {
      sendMessage(callBackMessages);
      // setMatchMessages(previousMessages =>
      //   GiftedChat.append(previousMessages, callBackMessages),
      // );
    },
    [sendMessage],
  );
  return (
    <>
      <FriendList isMember horizental size={50} listToRender={match.members} />
      <Divider />
      <GiftedChat
        messages={matchMessages}
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
    </>
  );
}
