export const CREATETEAM = 'CREATETEAM';
export const LOADING = 'LOADING';
export const FAILURE = 'FAILURE';
export const RESET = 'RESET';

export const teamActions = {
  loading: () => ({type: LOADING}),
  reset: () => ({type: RESET}),
  failure: errorMessage => ({type: FAILURE, payload: errorMessage}),
  createTeam: payload => ({type: CREATETEAM, payload}),
};
