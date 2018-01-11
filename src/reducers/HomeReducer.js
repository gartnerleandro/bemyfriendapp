import {
  FETCH_PUBLICATIONS_SUCCESS,
  FETCH_PUBLICATIONS_FAILED,
} from '../actions/types';

const INITIAL_STATE = {
  publications: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PUBLICATIONS_SUCCESS:
      return { ...state, publications: action.payload };
    case FETCH_PUBLICATIONS_FAILED:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
