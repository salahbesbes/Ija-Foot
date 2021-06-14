import {
  LOADING,
  SUCCESS,
  FAILURE,
  RESET,
  CREATETEAM,
  LOGOUT,
} from '../actions/team-A';

export const teamInitialState = {
  teamLoading: false,
  teamError: false,
  team: {
    uid: null,
    members: [],
    admins: [],
    createdAt: null,
    teamName: null,
    location: null,
    description: null,
    date: null,
    chatRoomId: null,
  },
};

export function teamReducer(state, {type, payload}) {
  switch (type) {
    case LOADING:
      return {...state, teamLoading: true, teamError: false};
    case RESET:
      return {...state, teamLoading: false, teamError: false};
    case FAILURE:
      return {...state, teamLoading: false, teamError: payload};
    case LOGOUT:
      return teamInitialState;

    case CREATETEAM:
      return {...state, teamLoading: false, teamError: false, team: payload};
    default:
      return state;
  }
}
