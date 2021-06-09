import {LOADING, SUCCESS, FAILURE, RESET, CREATETEAM} from '../actions/team-A';

export const teamInitialState = {
  teamLoading: false,
  teamError: false,
  team: {
    uid: undefined,
    members: [],
    admin: undefined,
    createdAt: undefined,
    teamName: undefined,
    location: undefined,
    description: undefined,
    date: undefined,
    chatRoomId: undefined,
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
    case CREATETEAM:
      return {...state, teamLoading: false, teamError: false, team: payload};
    default:
      return state;
  }
}
