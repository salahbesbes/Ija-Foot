import React, {useState, useCallback, useEffect} from 'react';
import CreateTeamModal from '../team/CreateTeamModal';
import {GiftedChat} from 'react-native-gifted-chat';
import {useChatRoom} from '../../hooks/useChatRoom';
export function ChatRoom({navigation}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <CreateTeamModal />,
    });
  }, [navigation]);
  const [roomMessages, setRoomMessages] = useState([]);

  const {
    sendMessage,
    ListenOnMessages,
    user,
    ListenOnChatRoomDoc,
    ListenOnTeamDoc,
    listenOnMembersCollection,
  } = useChatRoom(setRoomMessages);

  useEffect(() => {
    const unsub = ListenOnMessages(setRoomMessages);
    return () => unsub();
  }, [ListenOnMessages]);

  useEffect(() => {
    const unsub = ListenOnTeamDoc();
    return () => unsub();
  }, [ListenOnTeamDoc]);

  useEffect(() => {
    const unsub = ListenOnTeamDoc();
    return () => unsub();
  }, [ListenOnTeamDoc]);

  useEffect(() => {
    const unsub = ListenOnChatRoomDoc();
    return () => unsub();
  }, [ListenOnChatRoomDoc]);
  useEffect(() => {
    const unsub = listenOnMembersCollection();
    return () => unsub();
  }, [listenOnMembersCollection]);

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
