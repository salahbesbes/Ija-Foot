import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {useChatRoom} from '../../hooks/useChatRoom';
import {Divider} from 'react-native-paper';
import FriendList from '../ProfileNav/FriendList';
import UpdateChatRoom from '../team/UpdateChatRoom';

export function ChatRoom({navigation}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <UpdateChatRoom />,
    });
  }, [navigation]);
  const [roomMessages, setRoomMessages] = useState([]);

  const {sendMessage, ListenOnMessages, user, team} =
    useChatRoom(setRoomMessages);

  useEffect(() => {
    const unsub = ListenOnMessages(setRoomMessages);
    return () => unsub();
  }, [ListenOnMessages]);

  const onSend = useCallback(
    (callBackMessages = []) => {
      sendMessage(callBackMessages);
      // setRoomMessages(previousMessages =>
      //   GiftedChat.append(previousMessages, callBackMessages),
      // );
    },
    [sendMessage],
  );
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <UpdateChatRoom navigation={navigation} />,
    });
  }, [navigation]);
  return (
    <>
      <FriendList isMember horizental size={50} listToRender={team.members} />
      <Divider />
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
    </>
  );
}
