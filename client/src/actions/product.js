import { 
    GET_PRODUCTS,
    GET_PRODUCT,
    ADD_PRODUCT,
    PRODUCT_ERROR,
    DELETE_PRODUCT
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
        const errors = err.response.data.errors;

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

//Get all products
export const getProducts = () => async dispatch => {
    try {
        const res = await axios.get('/api/product');
        dispatch({
            type:GET_PRODUCTS,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:PRODUCT_ERROR,
            payload: { msg:err.response.statusText, status:err.response.status }
        });
    }
};

//Get product by id 
export const getProductById = id => async dispatch => {
    try {
        const res = await axios.get(`/api/product/${id}`);
        dispatch({
            type:GET_PRODUCT,
            payload:res.data
        });
    } catch (err) {
        dispatch({
            type:PRODUCT_ERROR,
            payload: { msg:err.response.statusText, status:err.response.status }
        });
    }
};

//Get product by id 
export const deleteProductById = id => async dispatch => {
    try {
        await axios.delete(`/api/product/${id}`);
        dispatch({
            type:DELETE_PRODUCT,
            payload:id
        })
        dispatch(setAlert('Product Removed','success'));
    } catch (err) {
        dispatch({
            type:PRODUCT_ERROR,
            payload: { msg:err.response.statusText, status:err.response.status }
        });
    }
}