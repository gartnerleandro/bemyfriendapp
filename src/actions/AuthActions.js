import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
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


export const loginUser = () => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
  };
};

export function loginUserSuccess(user) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_USER_SUCCESS,
      id: user.id,
      username: user.username
    });
    Actions.main();
  };
}

export const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

export const prueba = (data) => {
  return (dispatch) => {
    const user = {
      username: data.email,
      password: data.password,
    };
    dispatch({ type: LOGIN_USER_REQUEST });
    return axios.post(`${API_DOMAIN}/api/login/user`, user)
      .then((response) => {
        dispatch({
          type: LOGIN_USER_SUCCESS,
          id: response.data.id,
          username: response.data.username
        });
        AsyncStorage.multiSet([
          ['username', response.data.username],
          ['userId', response.data.id]
        ]);
        Actions.main();
      })
      .catch((error) => {
        dispatch({ type: LOGIN_USER_FAIL, payload: error });
      });
  };
};
