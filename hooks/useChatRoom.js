import db from '@react-native-firebase/firestore';
import {useCallback, useContext} from 'react';
import {AppStateContext} from '../stateProvider';

export const useChatRoom = () => {
  const {authContext, teamContext} = useContext(AppStateContext);
  const [authState, userDispatch] = authContext;
  const [teamState, teamDispatch] = teamContext;
  const {team} = teamState;
  const {user} = authState;

  const ListningOnTeamUpdates = useCallback(() => {
    try {
      console.log(
        'teamid =>',
        team.uid,
        '||||  chatroom id =>',
        team.chatRoomId,
      );
      team.uid &&
        db()
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
            // setRoomMessages(chatMessages);
          });
      const unsubscribe = () => {
        console.log('TBC - Unsubscribe for listSagas.js');
      };
      return unsubscribe;
    } catch (error) {
      console.log('Listning to chatRoom ERROR =>> ', error.message);
      console.error(error);
    }
  }, [team]);

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
              name: user.fullName || null,
              avatar: user.avatar || null,
            },
          };
          db()
            .doc(`teams/${team.uid}/chatRoom/${team.chatRoomId}`) // chatRoomIdd
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
    [user, team],
  );

  return {
    ListningOnTeamUpdates,
    ...authState,
    ...teamState,
    userDispatch,
    teamDispatch,
    sendMessage,
  };
};
