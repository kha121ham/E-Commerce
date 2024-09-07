import { 
    GET_PROFILE,
    PROFILE_ERROR
 } from "./type";
import axios from "axios";
import { setAlert } from './setAlert';

 //Get user profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload: { msg:err.response.statusText, status:err.response.status }
        })
    }
 };

//Create and update profile
export const createProfile = (formData) => async dispatch => {
const config = {
    headers:{
        'Content-Type':'application/json'
    }
};
try {
    const res = await axios.post('/api/profile',formData,config);
    dispatch({
        type:GET_PROFILE,
        payload:res.data
    });
    dispatch(setAlert('Profile Updated','success'))
} catch (err) {
    dispatch({
        type:PROFILE_ERROR,
        payload: { msg:err.response.statusText, status:err.response.status }
    });
}
}