import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case SIGNUP_USER_SUCCESS:
      return { ...INITIAL_STATE };
    case SIGNUP_USER_FAIL:
      return { ...state, loading: false, error: 'Autentificación fallida', password: '' };
    default:
      return state;
  }
};
