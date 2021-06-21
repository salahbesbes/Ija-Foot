import {useCallback, useContext} from 'react';
import db from '@react-native-firebase/firestore';

import {matchActions} from '../stateManager/actions/match-A';
import {AppStateContext} from '../stateProvider';

export const useGetMatchInfo = () => {
  const {matchContext} = useContext(AppStateContext);
  const [matchState, matchDispatch] = matchContext;

  const getMatch = useCallback(async loggedUser => {
    // use the logged user to get the detail of the match
    let matchDoc = await db()
      .collection('matchs')
      .doc(loggedUser.matchId)
      .get();
    const playermatch = matchDoc.data();

    //* get members

    let membersDocs = await db()
      .collection('matchs')
      .doc(loggedUser.matchId)
      .collection('members')
      .get();

    const matchMembers = membersDocs.docs.map(memberDoc => {
      return {...memberDoc.data(), uid: memberDoc.id};
    });
    // update locale state
    matchDispatch(
      matchActions.setMatch({
        ...playermatch,
        uid: matchDoc.id,
        matchRoomId: loggedUser.matchRoomId,
        members: matchMembers,
      }),
    );
    console.log('we set new match in the local State');
  }, []);

  return {getMatch};
};
