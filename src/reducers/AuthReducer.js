import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_START,
  LOGOUT_USER
} from '../actions/types';

const INITIAL_STATE = {
  email: 'Test@test.com',
  password: 'password',
  user: null,
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  //console.log(action.type);
  //console.log(state);
  switch (action.type) {
    case EMAIL_CHANGED:
      // ...state takes all props and values from state and appends them to this new object
      // it is critical to return a _new_ object and not mutate existing state in redux
      // note: later key/values will overwrite the earlier ones, so if you were
      //   to put '...state' at the end it would overwrite 'email' with the last state it was in
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER_START:
      return { ...state, error: '', loading: true };
    case LOGIN_USER_SUCCESS:
      // here we are resetting every piece of state to its initial state except 'user'
      return {
        ...INITIAL_STATE,
        user: action.payload,
      };
    case LOGOUT_USER:
      return { ...INITIAL_STATE };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed.', loading: false };
    default:
      return state;
  }
};
