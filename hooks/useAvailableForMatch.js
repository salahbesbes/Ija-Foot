import db from '@react-native-firebase/firestore';

import {useCallback, useContext} from 'react';
import {actionCreators} from '../stateManager/actions/auth-A';
import {AppStateContext} from '../stateProvider';

const useAvailableForMatch = () => {
  //const {authContext} = useContext(AppStateContext);
  const [state, dispatch] = useContext(AppStateContext).authContext;
  const {user} = state;

  const updateAvailability = useCallback(
    async (isAvailable, data) => {
      dispatch(actionCreators.loading());
      try {
        await db()
          .collection('players')
          .doc(user.uid)
          .update({isAvailable: isAvailable, availabilityData: data});
        dispatch(
          actionCreators.loadUser({
            ...user,
            isAvailable: isAvailable,
            availabilityData: data,
          }),
        );
      } catch (error) {
        dispatch(actionCreators.failure(error.message));
        console.log('updateAvailibility ERROR => ', error.message);
        return;
      }
    },
    [user, dispatch],
  );
  return {...state, dispatch, updateAvailability};
};
export default useAvailableForMatch;
