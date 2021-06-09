import React, {createContext, useReducer} from 'react';
import {authReducer, initialState} from './stateManager/reducers/auth-R';
import {teamReducer, teamInitialState} from './stateManager/reducers/team-R';

export const AppStateContext = createContext('defaulttt');

const AppStateProvider = props => {
  const [authState, dispatch] = useReducer(authReducer, initialState);
  const [teamState, teamDispatch] = useReducer(teamReducer, teamInitialState);
  // set the store with the init state of the auth reducer
  // store contain multiple reducers
  const store = {
    authContext: [authState, dispatch],
    teamContext: [teamState, teamDispatch],
  };

  return (
    <AppStateContext.Provider value={store}>
      {props.children}
    </AppStateContext.Provider>
  );
};
export default AppStateProvider;
