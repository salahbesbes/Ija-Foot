import db from '@react-native-firebase/firestore';
import {useCallback, useContext, useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {AppStateContext} from '../stateProvider';
const timeStump = db.FieldValue.serverTimestamp();

export const useChatRoom = setRoomMessages => {
  const {authContext, teamContext} = useContext(AppStateContext);
  const [authState, userDispatch] = authContext;
  const [teamState, teamDispatch] = teamContext;
  const {team} = teamState;
  const {user} = authState;

  const ListningOnTeamUpdates = useCallback(async () => {
    try {
      db()
        .doc('teams/pf9LChzNfzesr9z9BEL5/chatRoom/byMvNSft2MOcEovT19jz8UEBjUM2') // chatRoomIdd
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
          // console.log('chatMessages :>> ', chatMessages.length);
          setRoomMessages(chatMessages);
        });
    } catch (error) {
      console.log('Listning to chatRoom ERROR =>> ', error.message);
      console.error(error);
    }
  }, [setRoomMessages]);
  const sendMessage = useCallback(
    async callBackMessages => {
      try {
        // this line convert the time to the DateFormat that react-native-gifted-chat uses
        // https://stackoverflow.com/questions/59213581/why-react-native-gifted-chat-not-displaying-time-correctly-from-firebase-timesta/61673983#61673983
        callBackMessages.forEach(({text, createdAt}) => {
          const message = {
            text,
            createdAt: Date.parse(createdAt),
            user: {
              _id: user.uid,
              name: user.fullName,
              avatar: user.avatar,
            },
          };
          db()
            .doc(
              'teams/pf9LChzNfzesr9z9BEL5/chatRoom/byMvNSft2MOcEovT19jz8UEBjUM2',
            ) // chatRoomIdd
            .collection('messages')
            .add(message);
        });
      } catch (error) {
        console.log('send Message ERROR =>> ', error.message);
      }
      // .then(() => {
      //   setRoomMessages(previousMessages =>
      //     GiftedChat.append(previousMessages, ckallBackMessage),
      //   );
      // });

      console.log('we sent a message');
    },
    [user],
  );

  return {
    ListningOnTeamUpdates,
    ...authState,
    ...teamState,
    userDispatch,
    teamDispatch,
    sendMessage,
    setRoomMessages,
  };
};
