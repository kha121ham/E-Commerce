import { combineReducers} from 'redux';
import  { alertReducer }  from './setAlert';

export default combineReducers({
    alert:alertReducer
});
