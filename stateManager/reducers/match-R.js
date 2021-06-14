import {LOADING, FAILURE, RESET, LOGOUT, CREATEMATCH} from '../actions/match-A';

export const matchInitialState = {
  matchLoading: false,
  matchError: false,
  match: {
    uid: null,
    members: [],
    createdAt: null,
    teamA: null,
    teamB: null,
    matchRoomId: null,
  },
};

export function matchReducer(state, {type, payload}) {
  switch (type) {
    case LOADING:
      return {...state, matchLoading: true, matchError: false};
    case RESET:
      return {...state, matchLoading: false, matchError: false};
    case FAILURE:
      return {...state, matchLoading: false, matchError: payload};
    case LOGOUT:
      return matchInitialState;

    case CREATEMATCH:
      return {...state, matchLoading: false, matchError: false, match: payload};
    default:
      return state;
  }
}
