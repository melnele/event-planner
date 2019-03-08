import { combineReducers } from "redux";
import eventReducer from './eventReducer';
import auth from './auth';

export default combineReducers({
    events: eventReducer,
    auth
});
