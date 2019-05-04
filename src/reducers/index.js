import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import TripReducer from './TripReducer';

export default combineReducers({
  auth: AuthReducer,
  trip: TripReducer,
});
