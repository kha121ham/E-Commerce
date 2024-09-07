import { combineReducers} from 'redux';
import  { alertReducer }  from './setAlert';
import auth from './auth';
import profile from './profile';
import product from './product';
export default combineReducers({
    alert:alertReducer,
    auth,
    profile,
    product
});
