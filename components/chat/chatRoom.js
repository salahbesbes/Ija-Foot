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
    team,
  } = useChatRoom(setRoomMessages);

  useEffect(() => {
    const asynchrone = async () => {
      const unsubteam = await ListenOnTeamDoc();
      const unsubMembers = await listenOnMembersCollection();
      const unsubchaRoom = await ListenOnChatRoomDoc();
      const unsubMessage = await ListenOnMessages(setRoomMessages);
      return [unsubteam, unsubMembers, unsubchaRoom, unsubMessage];
    };
    return asynchrone();
  }, [
    ListenOnTeamDoc,
    listenOnMembersCollection,
    ListenOnChatRoomDoc,
    ListenOnMessages,
  ]);

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
