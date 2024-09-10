import { combineReducers} from 'redux';
import  { alertReducer }  from './setAlert';
import auth from './auth';
import profile from './profile';
import product from './product';
import order from './order';
import category from './category'
export default combineReducers({
    alert:alertReducer,
    auth,
    profile,
    product,
    order,
    category
});
