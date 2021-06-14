export const CREATEMATCH = 'CREATEMATCH';
export const LOADING = 'LOADING';
export const FAILURE = 'FAILURE';
export const RESET = 'RESET';
export const LOGOUT = 'LOGOUT';

export const matchActions = {
  loading: () => ({type: LOADING}),
  reset: () => ({type: RESET}),
  failure: errorMessage => ({type: FAILURE, payload: errorMessage}),
  setMatch: payload => ({type: CREATEMATCH, payload}),
  logOut: () => ({type: LOGOUT}),
};
