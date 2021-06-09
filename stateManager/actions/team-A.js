export const CREATETEAM = 'CREATETEAM';
export const LOADING = 'LOADING';
export const FAILURE = 'FAILURE';
export const RESET = 'RESET';
export const LOGOUT = 'LOGOUT';

export const teamActions = {
  loading: () => ({type: LOADING}),
  reset: () => ({type: RESET}),
  failure: errorMessage => ({type: FAILURE, payload: errorMessage}),
  setTeam: payload => ({type: CREATETEAM, payload}),
  logOut: () => ({type: LOGOUT}),
};
