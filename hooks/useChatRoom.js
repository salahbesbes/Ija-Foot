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

  const ListenOnMessages = useCallback(setRoomMessages => {
    console.log('teamid =>', team.uid, '||||  chatroom id =>', team.chatRoomId);
    if (team.uid) {
      try {
        const listenMessage = db()
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

        return listenMessage;
      } catch (error) {
        console.log('listnng to message and RoomDoc ERROR =>> ', error.message);
      }
    } else {
      console.log('you are not be able to log to chat Room');
      console.log('members Now', team.members.length, team.members);
      return () => {};
    }
  }, []);

  const ListenOnTeamDoc = useCallback(() => {
    const unsub = db()
      .collection('teams')
      .onSnapshot(snapshot => {
        console.log('the team doc has changed');
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            console.log('TEAM DOC ==> listning on ADD action: ');
          }
          if (change.type === 'modified') {
            console.log('TEAM DOC ==> listning on modified action: ');
            const {createdAt, ...updatedTeam} = change.doc.data();
            teamDispatch(teamActions.setTeam({...team, ...updatedTeam}));
          }
          if (change.type === 'removed') {
            console.log(
              'TEAM DOC ==> listning on removed action: ',
              change.doc.data(),
            );
          }
        });
      });

    return unsub;
  }, []);

  const ListenOnChatRoomDoc = useCallback(() => {
    const unsub = db()
      .doc(`teams/${team.uid}`)
      .collection('chatRoom')
      .onSnapshot(snapshot => {
        console.log('the chatRoom doc has changed');
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            const chatRoom = change.doc.data();
            teamDispatch(
              teamActions.setTeam({...team, admins: chatRoom.admins}),
            );

            console.log('ChatRoom -->listning on ADD action: ');
          }
          if (change.type === 'modified') {
            console.log('ChatRoom -->listning on modified action: ');
            const chatRoom = change.doc.data();
            teamDispatch(
              teamActions.setTeam({...team, admins: chatRoom.admins}),
            );
          }
          if (change.type === 'removed') {
            console.log(
              'ChatRoom -->listning on removed action: ',
              change.doc.data(),
            );
          }
        });
      });
    return unsub;
  }, []);

  const listenOnMembersCollection = useCallback(() => {
    const unsub = db()
      .doc(`teams/${team.uid}`)
      .collection('members')
      .onSnapshot(snapshot => {
        console.log('the MEMBERS collecton  has changed');
        // console.log('snapshot.docs', snapshot.docs.length);
        // console.log('snapshot.docChanges()', snapshot.docChanges().length);
        // cteate new list of members --> update local state

        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            const docChanged = {...change.doc.data(), uid: change.doc.id};

            // if the player is not already in the team
            const playerIsMember = team.members // true or false
              .map(player => player.uid)
              .includes(docChanged.uid);

            if (!playerIsMember) {
              teamDispatch(
                teamActions.setTeam({
                  ...team,
                  members: [...team.members, docChanged],
                }),
              );
            }
          }
          if (change.type === 'modified') {
            console.log('listning on member  modified ');
          }
          if (change.type === 'removed') {
            const removedPlayer = {...change.doc.data(), uid: change.doc.id};
            console.log(team.members.length);

            const newList = team.members.filter(
              player => player.uid !== removedPlayer.uid,
            );
            console.log(newList.length);
            teamDispatch(
              teamActions.setTeam({
                ...team,
                members: newList,
              }),
            );
          }
        });
      });
    return unsub;
  }, []);
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
    ListenOnMessages,
    ...authState,
    ...teamState,
    userDispatch,
    teamDispatch,
    sendMessage,
    ListenOnChatRoomDoc,
    ListenOnTeamDoc,
    listenOnMembersCollection,
  };
};
