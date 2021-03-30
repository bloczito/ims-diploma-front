import { combineReducers } from "redux";

// import * from "./users.reducer";
import {authentication} from "./authentication.reducer";


const rootReducer = combineReducers({
    authentication
});

export default rootReducer;
