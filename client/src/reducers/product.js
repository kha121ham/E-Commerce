import { 
    ADD_PRODUCT,
    GET_PRODUCTS,
    GET_PRODUCT,
    DELETE_PRODUCT,
    PRODUCT_ERROR,
    CLEAR_PRODUCTS
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
                products:[payload,...state.products],
                loading:false
            };
        case PRODUCT_ERROR:
            return {
                ...state,
                loading:false,
                error:payload
            };
        case GET_PRODUCTS:
            return {
                ...state,
                products:payload,
                loading:false
            };
        case GET_PRODUCT:
            return {
                ...state,
                product:payload,
                loading:false
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                products:state.products.filter(product=>product._id !== payload),
                loading:false
            };
        case CLEAR_PRODUCTS:
            return {
                ...state,
                products:[],
                loading:false
            }
        default:
            return state;
    }
}