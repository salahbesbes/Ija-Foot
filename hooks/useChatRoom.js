import {useCallback, useContext} from 'react';
import db from '@react-native-firebase/firestore';

import {teamActions} from '../stateManager/actions/team-A';
import {AppStateContext} from '../stateProvider';

export const useChatRoom = () => {
  const {authContext, teamContext, matchContext} = useContext(AppStateContext);
  const [authState, userDispatch] = authContext;
  const [teamState, teamDispatch] = teamContext;
  const [matchState, matchDispatch] = matchContext;
  const {team} = teamState;
  const {user} = authState;

  const ListenOnMessages = useCallback(setRoomMessages => {
    // every time any user send message this callback update the chatRoom Screen
    // with new list of messages
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
            console.log('TEAM DOC ==> listning on removed action: ');
          }
        });
      });

    return unsub;
  }, []);

  const ListenOnChatRoomDoc = useCallback(() => {
    let unsub;
    // only if teamid exist
    if (team.uid) {
      unsub = db()
        .doc(`teams/${team.uid}`)
        .collection('chatRoom')
        .onSnapshot(snapshot => {
          // every time the admin changes the details of a team this callback should execute and updates the view

          console.log('the chatRoom doc has changed');
          const chatRoom = snapshot.docs[0];
          teamDispatch(
            teamActions.setTeam({
              ...team,
              admins: chatRoom.data().admins,
            }),
          );
        });
    }
    return unsub;
  }, []);

  const listenOnMembersCollection = useCallback(() => {
    const unsub = db()
      .doc(`teams/${team.uid}`)
      .collection('members')
      .onSnapshot(snapshot => {
        // every time the collection memebers is  updated (add/remove) this callback should excute

        const membersDb = snapshot.docs.map(doc => {
          return {...doc.data(), uid: doc.id};
        });
        teamDispatch(
          teamActions.setTeam({
            ...team,
            members: membersDb,
          }),
        );
      });
    console.log('OnMembersCollection is listning');
    return unsub;
  }, []);

  // this function saves message to database
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
    ...matchState,
    matchDispatch,
    userDispatch,
    teamDispatch,
    sendMessage,
    ListenOnChatRoomDoc,
    ListenOnTeamDoc,
    listenOnMembersCollection,
  };
};
