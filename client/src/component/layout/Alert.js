import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAlert } from '../../actions/setAlert';

const AlertComponent = () => {
  const dispatch = useDispatch();
  const alert = useSelector(state => state.alert);

  if (!alert.message) return null;

  return (
    <div className={`alert alert-${alert.alertType}`}>
      {alert.message}
      <button className="close-btn" onClick={() => dispatch(clearAlert())}>
      {alert.alertType === 'error' ? (<i class="fa-solid fa-delete-left del"></i>):
      (<i class="fa-solid fa-circle-check check"></i>) }
      </button>
    </div>
  );
};

export default AlertComponent;