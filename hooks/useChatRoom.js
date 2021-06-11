import db from '@react-native-firebase/firestore';
import {useCallback, useContext} from 'react';
import {teamActions} from '../stateManager/actions/team-A';
import {AppStateContext} from '../stateProvider';

export const useChatRoom = () => {
  const {authContext, teamContext} = useContext(AppStateContext);
  const [authState, userDispatch] = authContext;
  const [teamState, teamDispatch] = teamContext;
  const {team} = teamState;
  const {user} = authState;

  const ListningOnTeamUpdates = useCallback(
    setRoomMessages => {
      try {
        console.log(
          'teamid =>',
          team.uid,
          '||||  chatroom id =>',
          team.chatRoomId,
        );
        if (team.uid) {
          try {
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
                if (setRoomMessages) setRoomMessages(chatMessages);
              });

            db()
              .doc(`teams/${team.uid}`)
              .collection('chatRoom')
              .onSnapshot(snapshot => {
                console.log('the team doc has changed');
                snapshot.docChanges().forEach(change => {
                  if (change.type === 'added') {
                    console.log('doc ', change.doc.id, 'haschanged');
                    const chatRoom = change.doc.data().admins;
                    teamDispatch(
                      teamActions.setTeam({...team, admins: chatRoom.admins}),
                    );

                    console.log('listning on ADD action: ', change.doc.data());
                  }
                  if (change.type === 'modified') {
                    console.log(
                      'listning on modified action: ',
                      change.doc.data().admins,
                    );
                    const chatRoom = change.doc.data();
                    teamDispatch(
                      teamActions.setTeam({...team, admins: chatRoom.admins}),
                    );
                  }
                  if (change.type === 'removed') {
                    console.log(
                      'listning on removed action: ',
                      change.doc.data(),
                    );
                  }
                });
              });
          } catch (error) {
            console.log(
              'listnng to message and RoomDoc ERROR =>> ',
              error.message,
            );
          }
        } else {
          console.log('you are not be able to log to chat Room');
          console.log('members Now', team.members.length, team.members);
        }
      } catch (error) {
        console.log('Listning to chatRoom ERROR =>> ', error.message);
        console.error(error);
      }
    },
    [teamDispatch],
  );

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
