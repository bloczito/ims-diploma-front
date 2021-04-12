import { orderConstants } from "../_constants";
import { orderService } from "../_service";



export const orderActions = {
    getAll
}


function getAll() {
    return dispatch => {
        dispatch(request());

        orderService.getAll()
            .then(
                orders => dispatch(success(orders)),
                error => dispatch(failure(error))
            )
    }





    function request() { return { type: orderConstants.GET_ALL_REQUEST } }
    function success(orders) { return { type: orderConstants.GET_ALL_SUCCESS, orders } }
    function failure(error) { return { type: orderConstants.GET_ALL_FAILURE, error } }


}





