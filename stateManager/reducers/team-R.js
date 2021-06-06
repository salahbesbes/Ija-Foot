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
      return {...state, loading: true, error: false};
    case RESET:
      return {...state, loading: false, error: false};
    case FAILURE:
      return {...state, loading: false, error: payload};
    case CREATETEAM:
      return {...state, loading: false, error: false, team: payload};
    default:
      return state;
  }
}
