import React, {createContext, useReducer} from 'react';
import {authReducer, initialState} from './stateManager/reducers/auth-R';
import {matchInitialState, matchReducer} from './stateManager/reducers/match-R';
import {teamReducer, teamInitialState} from './stateManager/reducers/team-R';

export const AppStateContext = createContext('defaulttt');

const AppStateProvider = props => {
  const [authState, dispatch] = useReducer(authReducer, initialState);
  const [teamState, teamDispatch] = useReducer(teamReducer, teamInitialState);
  const [matchState, matchDispatch] = useReducer(
    matchReducer,
    matchInitialState,
  );
  // set the store with the init state of the auth reducer
  // store contain multiple reducers
  const store = {
    authContext: [authState, dispatch],
    teamContext: [teamState, teamDispatch],
    matchContext: [matchState, matchDispatch],
  };

  return (
    <AppStateContext.Provider value={store}>
      {props.children}
    </AppStateContext.Provider>
  );
};
export default AppStateProvider;
