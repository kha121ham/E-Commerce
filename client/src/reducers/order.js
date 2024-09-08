import { 
    ADD_ORDER,
    ORDER_ERROR
 } from "../actions/type";

const initialState = {
    orders:[],
    order:null,
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
            }
        case ORDER_ERROR:
            return {
                ...state,
                error:payload,
                loading:false
            };
        default:
            return state;
    }
}