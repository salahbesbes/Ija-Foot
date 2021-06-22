import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {useChatRoom} from '../../hooks/useChatRoom';
import {Button, Divider, Text} from 'react-native-paper';
import FriendList from '../ProfileNav/FriendList';
import UpdateChatRoom from '../team/UpdateChatRoom';
import db from '@react-native-firebase/firestore';

export function ChatRoom({navigation}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <UpdateChatRoom />,
    });
  }, [navigation]);
  const [roomMessages, setRoomMessages] = useState([]);

  const {ListenOnChatRoomDoc, sendMessage, ListenOnMessages, user, team} =
    useChatRoom(setRoomMessages);

  useEffect(() => {
    const unsub = ListenOnMessages(setRoomMessages);
    return () => unsub();
  }, [ListenOnMessages]);

  useEffect(() => {
    const unsub = ListenOnChatRoomDoc();
    return () => unsub();
  }, [ListenOnChatRoomDoc]);

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
      headerRight: () => (
        <>
          {/* <Button
            mode="outlined"
            onPress={async () => {
              try {
                // delete player from chatRoom Members collection
                await db()
                  .doc(`teams/${team.uid}/members/${user.uid}`)
                  .delete();

                // if player is admin -> update chatRoom kick Admin
                const playerIsAdmin = team.admins.includes(user.uid);

                if (playerIsAdmin) {
                  console.log(
                    ' the player is a admin we update  memeber and admin list ',
                  );

                  const updatedAdminsList = team.admins.filter(
                    id => id !== user.uid,
                  );
                  await db()
                    .doc(`teams/${team.uid}/chatRoom/${team.chatRoomId}`)
                    .update({
                      admins: updatedAdminsList,
                    });
                }

                // update plyer profile to delete chatRoomId
                await db().doc(`players/${user.uid}`).update({
                  teamId: null,
                  chatRoomId: null,
                  matchId: null,
                  matchRoomId: null,
                });
              } catch (error) {
                console.log(error);
              }
            }}>
            <Text> kickPlayer </Text>
          </Button> */}
          <UpdateChatRoom navigation={navigation} />
        </>
      ),
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
