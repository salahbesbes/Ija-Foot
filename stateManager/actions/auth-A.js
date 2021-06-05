export const LOADING = 'LOADING';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';
export const RESET = 'RESET';
export const LOGOUT = 'LOGOUT';
export const ADDFRIEND = 'ADDFRIEND';
export const DELETEFRIEND = 'DELETEFRIEND';
export const SETFRIEDNS = 'SETFRIEDNS';

export const actionCreators = {
  loading: () => ({type: LOADING}),
  reset: () => ({type: RESET}),
  logOut: () => ({type: LOGOUT}),
  failure: errorMessage => ({type: FAILURE, payload: errorMessage}),
  loadUser: user => ({
    type: SUCCESS,
    payload: user,
  }),
  setFriends: newList => ({type: SETFRIEDNS, payload: newList}),
  addFriend: payload => ({type: ADDFRIEND, payload}),
  deleteFriend: uid => ({type: DELETEFRIEND, payload: uid}),
};
