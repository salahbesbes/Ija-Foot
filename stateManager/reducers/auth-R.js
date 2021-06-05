import {
  LOADING,
  SUCCESS,
  FAILURE,
  RESET,
  LOGOUT,
  ADDFRIEND,
  DELETEFRIEND,
  SETFRIEDNS,
} from '../actions/auth-A';

export const initialState = {
  loading: false,
  error: false,
  user: undefined,
  userFriends: [],
};

export function authReducer(state, {type, payload}) {
  switch (type) {
    case LOADING:
      return {...state, loading: true, error: false};
    case SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        user: payload,
      };
    case RESET:
      return {...state, loading: false, error: false, userFriends: []};
    case LOGOUT:
      return {...state, loading: false, error: false, user: undefined};
    case FAILURE:
      return {...state, loading: false, error: payload};
    case ADDFRIEND:
      let friendAlreadyExist = state.userFriends.find(
        el => el.uid === payload.uid,
      );
      return {
        ...state,
        loading: false,
        error: false,
        userFriends: friendAlreadyExist
          ? state.userFriends
          : [...state.userFriends, payload],
      };
    case DELETEFRIEND:
      let newUserFriends = state.userFriends.filter(el => el.uid !== payload);
      return {
        ...state,
        loading: false,
        error: false,
        userFriends: newUserFriends,
      };
    case SETFRIEDNS:
      const newList = payload.map(el => el.data());
      return {
        ...state,
        loading: false,
        error: false,
        userFriends: newList,
      };
    default:
      return state;
  }
}
