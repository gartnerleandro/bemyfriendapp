import {
  SET_TITLE,
  SET_DESCRIPTION,
  CREATE_PUBLICATION_SUCCESS,
  CREATE_PUBLICATION_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
  publication: {
    title: '',
    description: '',
    image: null,
    error: '',
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_TITLE:
      return {
        ...state,
        publication: {
          ...state.publication,
          title: action.title,
        }
      };
    case SET_DESCRIPTION:
      return {
        ...state,
        publication: {
          ...state.publication,
          description: action.description,
        }
      };
    case CREATE_PUBLICATION_SUCCESS:
      return {
        ...INITIAL_STATE,
      };
    case CREATE_PUBLICATION_FAIL:
      return {
        ...state,
        publication: {
          ...state.publication,
          error: action.error,
        }
      };
    default:
      return state;
  }
};
