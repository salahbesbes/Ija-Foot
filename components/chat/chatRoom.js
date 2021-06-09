import React, {useState, useCallback, useEffect} from 'react';
import db from '@react-native-firebase/firestore';

import {GiftedChat} from 'react-native-gifted-chat';
import {useChatRoom} from '../../hooks/useChatRoom';
export function ChatRoom() {
  console.log('chatroom rendred');
  const [roomMessages, setRoomMessages] = useState([]);

  const {sendMessage, user, team} = useChatRoom(setRoomMessages);
  useEffect(() => {
    // 1st Argument - subscriber function
    console.log('List Updates being Requested');
    const unsubscribe = db()
      .doc(`teams/${team.uid}/chatRoom/${team.chatRoomId}`) // chatRoomIdd
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        let chatMessages = snapshot.docs.map(doc => {
          const msg = doc.data();
          // const time = msg.createdAt;
          return {
            _id: doc.id,
            text: msg?.text,
            createdAt: msg?.createdAt,
            user: msg?.user,
          };
        });

        console.log('chatMessages :>> ', chatMessages.length);
        setRoomMessages(chatMessages);
      });
    // console.log(unsubscribe.arguments);
    return () => unsubscribe();
  }, [team]);

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
