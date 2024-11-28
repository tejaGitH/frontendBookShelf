import { combineReducers } from "redux";
import bookReducer from './bookReducers';
import userReducer from './userReducers';
import friendshipReducer from './friendshipReducer';
import reviewReducer from './reviewReducer';

const rootReducer = combineReducers({
    books: bookReducer,
    users: userReducer,
    reviews: reviewReducer,
    friendships: friendshipReducer,
});
export default rootReducer;