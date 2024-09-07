import { 
    ADD_PRODUCT,
    GET_PRODUCT,
    PRODUCT_ERROR
 } from "../actions/type";


const initialState = {
    products:[],
    product:null,
    loading:true,
    error:{}
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state=initialState,action) {
    const { type, payload } = action;
    switch (type) {
        case ADD_PRODUCT:
            return {
                ...state,
                product:payload,
                loading:false
            }
        case PRODUCT_ERROR:
            return {
                ...state,
                loading:false,
                error:payload
            }
        default:
            return state;
    }
}