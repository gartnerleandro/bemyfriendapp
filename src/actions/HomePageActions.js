import axios from 'axios';
import {
  FETCH_PUBLICATIONS_REQUEST,
  FETCH_PUBLICATIONS_SUCCESS,
  FETCH_PUBLICATIONS_FAILED,
} from './types';

const API_DOMAIN = 'http://ec2-35-176-42-114.eu-west-2.compute.amazonaws.com:3000';

export const getPublications = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_PUBLICATIONS_REQUEST });
    return axios.get(`${API_DOMAIN}/api/publications`)
      .then((response) => {
        dispatch({
          type: FETCH_PUBLICATIONS_SUCCESS,
          payload: response.data.publications,
        });
      })
      .catch((error) => {
        dispatch({ type: FETCH_PUBLICATIONS_FAILED, payload: error });
      });
  };
};
