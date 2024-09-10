import { 
    ADD_ORDER,
    ORDER_ERROR,
    GET_USER_ORDERS,
    GET_ORDERS,
    DELETE_ORDER
 } from "../actions/type";

const initialState = {
    orders:[],
    order:null,
    userOrders:[],
    loading:true,
    error:{}
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state=initialState,action) {
    const { type, payload } = action;
    switch (type) {
        case ADD_ORDER:
            return {
                ...state,
                orders:[payload,...state.orders],
                loading:false,
                order:payload
            };
        case GET_ORDERS:
            return {
                ...state,
                orders:[...payload],
                loading:false,
            };
        case GET_USER_ORDERS:
            return {
                ...state,
                userOrders:[...payload],
                loading:false
            }
        case ORDER_ERROR:
            return {
                ...state,
                error:payload,
                loading:false
            };
        case DELETE_ORDER:
            return {
                ...state,
                userOrders:state.userOrders.filter(order => order._id !== payload),
                loading:false
            }
        default:
            return state;
    }
}