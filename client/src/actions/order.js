import { 
    ADD_ORDER,
    GET_ORDER,
    ORDER_ERROR
 } from "./type";
import axios from "axios";
import { setAlert } from "./setAlert";

//Add order
export const addOrder = formData => async dispatch => {
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    };
    try {
        const res = await axios.post('/api/order/add',formData,config);
        dispatch({
            type:ADD_ORDER,
            payload:res.data
        });
        dispatch(setAlert('Order Added','success'));
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors && Array.isArray(errors)) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
        } else {
            dispatch(setAlert('Adding order failed', 'error'));
        }
        dispatch({
            type:ORDER_ERROR,
            payload:{ msg:err.response.statusText, status:err.response.status }
        });
    }
};

//Get order by id
export const getOrderById = id => async dispatch => {
    try {
        const res = await axios.get(`/api/order/${id}`);
        dispatch({
            type:GET_ORDER,
            payload:res.data
        });
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors && Array.isArray(errors)) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
        } else {
            dispatch(setAlert('No order', 'error'));
        }
        dispatch({
            type:ORDER_ERROR
        });
    }
}