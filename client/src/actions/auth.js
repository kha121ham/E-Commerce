import axios from 'axios';
import
 {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
 } from './type';
import { setAlert } from './setAlert';
import setAuthToken from '../utils/setAuthToken';

//User Loaded
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
        }
    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type:USER_LOADED,
            payload:res.data
        });
    } catch (err) {
        dispatch({
            type:AUTH_ERROR
        });
    }
}
//Register User
export const register = (username, email, password)=> async dispatch => {
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    };
    const body = JSON.stringify({ username, email, password });
    try {
        const res = await axios.post('api/user/register',body,config);
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        });
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response?.data?.errors;

        if (errors && Array.isArray(errors)) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
        } else {
            dispatch(setAlert('Registration failed', 'error'));
        }

        dispatch({
            type: REGISTER_FAIL
        });
    }
};

export const login = (email,password) => async dispatch => {
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    };
    const body = JSON.stringify({ email, password });
    try {
        const res = await axios.post('/api/auth/login',body,config);
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        });
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response?.data?.errors;

        if (errors && Array.isArray(errors)) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
        } else {
            dispatch(setAlert('Login failed', 'error'));
        }

        dispatch({
            type: LOGIN_FAIL
        });
    }
};

//Logout Clear profile
export const logout = ()=>dispatch=>{
    dispatch({type:LOGOUT});
} ;