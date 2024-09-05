// actions/alertActions.js
import { SET_ALERT, CLEAR_ALERT } from './type';

// Set alert
export const setAlert = (message, alertType) => dispatch => {
  dispatch({
    type:SET_ALERT,
    payload: { message,alertType }
  });
  setTimeout(()=>{
    dispatch({
      type:CLEAR_ALERT
    })
  },5000)
} 
/*({
  type: SET_ALERT,
  payload: { message, alertType }
});*/

// Clear alert
export const clearAlert = () => ({
  type: CLEAR_ALERT
});
