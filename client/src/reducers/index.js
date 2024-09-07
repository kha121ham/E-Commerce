import { combineReducers} from 'redux';
import  { alertReducer }  from './setAlert';
import auth from './auth';
import profile from './profile';
export default combineReducers({
    alert:alertReducer,
    auth,
    profile
});
