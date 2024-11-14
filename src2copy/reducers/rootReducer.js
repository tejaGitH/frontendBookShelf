import { combineReducers } from "redux";
import bookReducer from './bookReducers';
import userReducer from './userReducers';

const rootReducer = combineReducers({
    books: bookReducer,
    users: userReducer,
});
export default rootReducer;