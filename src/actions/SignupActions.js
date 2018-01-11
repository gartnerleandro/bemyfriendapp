import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  SIGNUP_USER_REQUEST,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAIL,
} from './types';

const API_DOMAIN = 'http://ec2-35-176-42-114.eu-west-2.compute.amazonaws.com:3000';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};


export const signupUser = (data) => {
  return (dispatch) => {
    const user = {
      username: data.email,
      password: data.password,
    };
    dispatch({ type: SIGNUP_USER_REQUEST });
    return axios.post(`${API_DOMAIN}/api/register/user`, user)
      .then((response) => {
        dispatch({ type: SIGNUP_USER_SUCCESS });
        Actions.auth();
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: SIGNUP_USER_FAIL, payload: error });
      });
  };
};
