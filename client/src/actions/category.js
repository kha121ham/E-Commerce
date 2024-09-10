import {
    ADD_CATEGORY,
    GET_CATEGORIES,
    CATEGORY_ERROR
    } from "./type";
import axios from "axios";
import { setAlert } from "./setAlert";
export const addCategory = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    };
    try {
        const res = await axios.post('/api/category/add',formData,config);
        dispatch({
            type:ADD_CATEGORY,
            payload:res.data
        });
        dispatch(setAlert('Category Added','success'));
    } catch (err) {
        const errors = err.response.data.errors;
        dispatch({
            type:CATEGORY_ERROR,
            payload:{ msg:err.response.statusText, status:err.response.status }
        })
        if (errors && Array.isArray(errors)) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
        } else {
            dispatch(setAlert('Failed','error'));
        }
    }
};

//Get all categories
export const getCategories = () => async dispatch => {
    try {
        const res = await axios.get('/api/category');
        dispatch({
            type:GET_CATEGORIES,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:CATEGORY_ERROR,
            payload: { msg:err.response.statusText, status:err.response.status }
        });
    }
};