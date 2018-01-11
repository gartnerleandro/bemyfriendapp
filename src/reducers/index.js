import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PublicationReducer from './PublicationReducer';
import SignupReducer from './SignupReducer';
import HomeReducer from './HomeReducer';

export default combineReducers({
  auth: AuthReducer,
  publicationState: PublicationReducer,
  signup: SignupReducer,
  homeState: HomeReducer,
});
