import { combineReducers } from "redux";

import { authentication } from "./authentication.reducer";
import { orders } from "./order.reducer";
import {notification} from "./notification.reducer";

const rootReducer = combineReducers({
    authentication,
    orders,
    notification,
});

export default rootReducer;
