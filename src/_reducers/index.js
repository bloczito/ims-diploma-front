import { combineReducers } from "redux";

import { authentication } from "./authentication.reducer";
import { orders } from "./order.reducer";

const rootReducer = combineReducers({
    authentication,
    orders
});

export default rootReducer;
