import { orderConstants } from "../_constants";

export function orders(state = {}, action) {
    switch (action.type) {
        case orderConstants.GET_ALL_REQUEST:
            return {
                loading: true
            }
        case orderConstants.GET_ALL_SUCCESS:
            return {
                orders: action.orders
            }
        case orderConstants.GET_ALL_FAILURE:
            return {
                error: action.error
            }
        default:
            return state;
    }
}