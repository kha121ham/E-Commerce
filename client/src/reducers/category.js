import { 
    ADD_CATEGORY,
    GET_CATEGORIES,
    CATEGORY_ERROR
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
            }
        case CATEGORY_ERROR:
            return {
                ...state,
                error:payload,
                loading:false
            }
        default:
            return state
    }
}