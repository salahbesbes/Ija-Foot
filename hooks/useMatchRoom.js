import {useCallback, useContext} from 'react';
import db from '@react-native-firebase/firestore';

import {matchActions} from '../stateManager/actions/match-A';
import {AppStateContext} from '../stateProvider';

export const useMatchRoom = () => {
  // destructuring the global store got frim the provider
  const {authContext, matchContext} = useContext(AppStateContext);
  const [authState, userDispatch] = authContext;
  const [matchState, matchDispatch] = matchContext;
  const {match} = matchState;
  const {user} = authState;

  const ListenOnMessages = useCallback(setRoomMessages => {
    console.log(
      'matchid =>',
      match.uid,
      '||||  chatroom id =>',
      match.matchRoomId,
    );
    if (match.uid) {
      try {
        const listenMessage = db()
          .doc(`matchs/${match.uid}/chatRoom/${match.matchRoomId}`) // matchRoomIdd
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

            // every time any user send message this callback update the chatRoom Screen
            // with new list of messages
            console.log('chatMessages :>> ', chatMessages.length);
            if (setRoomMessages) setRoomMessages(chatMessages);
          });

        return listenMessage;
      } catch (error) {
        console.log('listnng to message and RoomDoc ERROR =>> ', error.message);
      }
    } else {
      console.log('you are not be able to log to chat Room');
      console.log('members Now', match.members.length, match.members);
      return () => {};
    }
  }, []);

  const ListenOnMatchDoc = useCallback(() => {
    const unsub = db()
      .collection('matchs')
      .onSnapshot(snapshot => {
        // every time the admin changes the details of a team this callback should execute and updates the view
        console.log('the match doc has changed');
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            console.log('match DOC ==> listning on ADD action: ');
          }
          if (change.type === 'modified') {
            console.log('match DOC ==> listning on modified action: ');
            const {createdAt, ...updatedmatch} = change.doc.data();
            matchDispatch(matchActions.setMatch({...match, ...updatedmatch}));
          }
          if (change.type === 'removed') {
            console.log('match DOC ==> listning on removed action: ');
          }
        });
      });

    return unsub;
  }, []);

  const listenOnMembersCollection = useCallback(() => {
    let unsub = () => {};
    unsub = db()
      .doc(`matchs/${match.uid}`)
      .collection('members')
      .onSnapshot(snapshot => {
        // every time the collection memebers is  updated (add/remove) this callback should excute
        console.log('the MEMBERS collecton  has changed');

        const membersDb = snapshot.docs.map(doc => {
          return {...doc.data(), uid: doc.id};
        });
        matchDispatch(
          matchActions.setMatch({
            ...match,
            members: membersDb,
          }),
        );
      });
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
            .doc(`matchs/${match.uid}/chatRoom/${match.matchRoomId}`) // matchRoomIdd
            .collection('messages')
            .add(message);
        });
      } catch (error) {
        console.log('send Message ERROR =>> ', error.message);
      }
      console.log('we sent a message');
    },
    [user, match],
  );

  return {
    ListenOnMessages,
    ...authState,
    ...matchState,
    userDispatch,
    matchDispatch,
    sendMessage,
    ListenOnMatchDoc,
    listenOnMembersCollection,
  };
};
