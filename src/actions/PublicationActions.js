import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import {
  SET_TITLE,
  SET_DESCRIPTION,
  CREATE_PUBLICATION_REQUEST,
  CREATE_PUBLICATION_SUCCESS,
  CREATE_PUBLICATION_FAIL,
  UPLOAD_IMAGE_REQUEST,
} from './types';

const API_DOMAIN = 'http://ec2-35-176-42-114.eu-west-2.compute.amazonaws.com:3000';

export const setTitle = (text) => {
  return {
    type: SET_TITLE,
    title: text
  };
};

export const setDescription = (text) => {
  return {
    type: SET_DESCRIPTION,
    description: text
  };
};

export const setPublication = (data) => {
  return (dispatch) => {
    const publication = {
      title: data.title,
      description: data.description,
      image: data.image,
      user: data.id,
    };
    dispatch({ type: CREATE_PUBLICATION_REQUEST });
    return axios.post(`${API_DOMAIN}/api/new-publication`, publication)
      .then(() => {
        dispatch({ type: CREATE_PUBLICATION_SUCCESS });
        Actions.home();
      })
      .catch((error) => {
        dispatch({ type: CREATE_PUBLICATION_FAIL, payload: error });
      });
  };
};

export const doUpload = (data) => {
  return (dispatch) => {
    dispatch({ type: UPLOAD_IMAGE_REQUEST });
    return axios({
      url: `${API_DOMAIN}/api/upload/image`,
      method: 'POST',
      data: {
        data_uri: data,
        filename: `image${Date.now()}.jpeg`,
        filetype: 'image/jpeg'
      }
    });
  };
};
