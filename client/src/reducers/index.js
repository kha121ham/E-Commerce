import { combineReducers} from 'redux';
import  { alertReducer }  from './setAlert';
import auth from './auth';
export default combineReducers({
    alert:alertReducer,
    auth
});
