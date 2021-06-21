import db from '@react-native-firebase/firestore';

import {useCallback, useContext} from 'react';
import {actionCreators} from '../stateManager/actions/auth-A';
import {AppStateContext} from '../stateProvider';

const useAvailableForMatch = () => {
  const [state, dispatch] = useContext(AppStateContext).authContext;
  const {user} = state;

  const updateAvailability = useCallback(
    async (isAvailable, data) => {
      // loading state
      dispatch(actionCreators.loading());
      try {
        // update profile
        await db()
          .collection('players')
          .doc(user.uid)
          .update({isAvailable: isAvailable, availabilityData: data});
        // update local state
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
  // return state and calbackFunctions
  return {...state, dispatch, updateAvailability};
};
export default useAvailableForMatch;
