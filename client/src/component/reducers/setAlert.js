// reducers/alertReducer.js
import { SET_ALERT, CLEAR_ALERT } from '../../actions/type';

const initialState = {
  message: '',
  alertType: ''  // can be 'success', 'error', etc.
};

export const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        message: action.payload.message,
        alertType: action.payload.alertType
      };
    case CLEAR_ALERT:
      return initialState;
    default:
      return state;
  }
};
