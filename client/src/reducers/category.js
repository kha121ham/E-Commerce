import { 
    ADD_CATEGORY,
    GET_CATEGORIES,
    GET_CATEGORY,
    CATEGORY_ERROR,
    DELETE_CATEGORY
    } from "../actions/type";

    const initialState = {
        categories:[],
        Category:null,
        loading:true,
        error:{}
    };

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState , action) {
    const { type, payload } = action;
    switch (type) {
        case ADD_CATEGORY:
            return {
                ...state,
                Category:payload,
                loading:false
            };
        case GET_CATEGORIES:
            return {
                ...state,
                categories:payload,
                loading:false
            };
        case GET_CATEGORY:
            return {
                ...state,
                Category:payload,
                loading:false
            }
        case CATEGORY_ERROR:
            return {
                ...state,
                error:payload,
                loading:false
            };
        case DELETE_CATEGORY:
            return {
                ...state,
                categories:state.categories.filter(category=>category._id !== payload),
                loading:false
            }
        default:
            return state
    }
}