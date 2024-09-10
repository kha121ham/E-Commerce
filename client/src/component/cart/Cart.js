/* eslint-disable array-callback-return */
import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserOrders } from '../../actions/order';
import { useParams } from 'react-router-dom';
import Spinner from '../../spinner/Spinner';
import { deleteOrderById } from '../../actions/order';
import { setAlert } from '../../actions/setAlert';

const Cart = ({ getUserOrders, order: { userOrders, loading }, deleteOrderById, setAlert }) => {
  const params = useParams();
  useEffect(()=>{
    getUserOrders(params.id);
  },[getUserOrders,params.id])
  let totalPrice = 0;
  userOrders.map(order => {
    totalPrice += order.totalAmount
  });
  const deleteAllSuccess = () => {
    userOrders.map(order => deleteOrderById(order._id));
    setAlert('Orders Paid Successfuly','success')
  }
  return (
    <Fragment>
        {loading ? (<Spinner/>) : ( <div>
         <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden bg">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        {userOrders.map((order,i) => <ul>
              <li
                
                className="flex justify-between items-center py-2 border-b last:border-b-0"
              >
                <div>
                  <p className="text-lg font-medium">order : {i+1}</p>
                  <p className="text-sm text-gray-500">Price : {order.totalAmount}$</p>
                  <p className="text-sm text-gray-500">Quantity : {order.items.length}</p>
                </div>
                <button type="button" onClick={()=>deleteOrderById(order._id)} className="dlt">X</button>
              </li>
          </ul> )}
      </div>
      <div className="p-4 border-t">
        <p className="text-lg font-bold">
          Total: <span>{totalPrice}$</span>
        </p>
        <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        onClick={userOrders.length > 0 ? ()=>deleteAllSuccess(): ()=>setAlert('No Orders To Paid','error')}
        >
          Checkout
        </button>
      </div>
    </div>
    </div>) }
    </Fragment>
  )
}

Cart.propTypes = {
  getOrders:PropTypes.func.isRequired,
  order:PropTypes.object.isRequired,
  product:PropTypes.object.isRequired,
  deleteOrderById:PropTypes.func.isRequired,
  setAlert:PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  order:state.order,
})

export default connect(mapStateToProps, { getUserOrders, deleteOrderById, setAlert })(Cart);
