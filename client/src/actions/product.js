import { 
    GET_PRODUCT,
    ADD_PRODUCT,
    PRODUCT_ERROR
 } from "./type";
import axios from "axios";
import { setAlert } from "./setAlert";

export const addProduct = formData => async dispatch =>{
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    };
    try {
        const res = await axios.post('/api/product',formData,config);
        dispatch({
            type:ADD_PRODUCT,
            payload:res.data
        });
        dispatch(setAlert('Product added','success'));
    } catch (err) {
        const errors = err.response?.data?.errors;

        if (errors && Array.isArray(errors)) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
        } else {
            dispatch(setAlert('Adding product failed', 'error'));
        }
        dispatch({
            type:PRODUCT_ERROR
        });
    }
};