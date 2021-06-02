import {LOADING, SUCCESS, FAILURE, RESET, LOGOUT} from '../actions/auth-A';

export const initialState = {
  loading: false,
  error: false,
  user: undefined,
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
      return {...state, loading: false, error: false};
    case LOGOUT:
      console.log('log reducer');
      return {...state, loading: false, error: false, user: undefined};
    case FAILURE:
      //todo: update this later
      return {...state, loading: false, error: payload, user: undefined};
  }
}
