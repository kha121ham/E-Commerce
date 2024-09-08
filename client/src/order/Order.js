import React, { Fragment, useEffect, useState } from 'react';
import { addOrder } from '../actions/order';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUser } from '../actions/auth';
import { getProductById } from '../actions/product';
import { useParams } from 'react-router-dom';
import Spinner from '../spinner/Spinner';

const Order = ({ addOrder, auth, product: { product, loading }, getProductById }) => {
  const params = useParams();
  useEffect(()=>{
    loadUser();
    getProductById(params.id);
  },[getProductById,params.id]);
  const sayPrice = product ? product.price : '';
  const [user, setUser] = useState(`${auth.user ? auth.user._id:''}`); // User ID
  const [items, setItems] = useState([{ product: `${params.id}`, quantity: 1, price: `${sayPrice}` }]); // Items array
  const [totalAmount, setTotalAmount] = useState(0); // Total amount
   const handleItemChange = (index, event) => {
    const { name, value } = event.target;
    const updatedItems = [...items];
    updatedItems[index] = {
        ...updatedItems[index],
        [name]: name === 'quantity' || name === 'price' ? Number(value) : value,
    };
    setItems(updatedItems);
    calculateTotal(updatedItems);
};
   // Calculate total amount
   const calculateTotal = (items) => {
    const total = items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    setTotalAmount(total);
};
   const handleSubmit = e => {
    e.preventDefault();
    const orderItem = {
      user,
      items,
      totalAmount
    };
    addOrder(orderItem);
   }
  return product ? !loading && (<Fragment>
  <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg frm">
            <h2 className="text-2xl font-bold text-center mb-4">Add Order</h2>
            <form onSubmit={handleSubmit}>

                {/* Items Fields */}
                {items.map((item, index) => (
                    <div key={index} className="mb-4">
                        <div className="mb-2">
                            <label className="block text-sm font-medium text-gray-700">Product ID</label>
                            <input
                                type="text"
                                name="product"
                                value={item.product}
                                readOnly
                                onChange={(e) => handleItemChange(index, e)}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>

                        <div className="mb-2">
                            <label className="block text-sm font-medium text-gray-700">Quantity</label>
                            <input
                                type="number"
                                name="quantity"
                                value={item.quantity}
                                onChange={(e) => handleItemChange(index, e)}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                required
                                min="1"
                            />
                        </div>

                        <div className="mb-2">
                            <label className="block text-sm font-medium text-gray-700">Price</label>
                            <input
                                type="number"
                                name="price"
                                readOnly
                                value={sayPrice}
                                onChange={(e) => handleItemChange(index, e)}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                required
                                min="0"
                                step="0.01"
                            />
                        </div>
                    </div>
                ))}
                {/* Total Amount */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Total Amount</label>
                    <input
                        type="number"
                        value={totalAmount}
                        readOnly
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm bg-gray-100"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white p-2 mt-4 rounded-md hover:bg-indigo-700">
                    Submit Order
                </button>
            </form>
        </div>
    </Fragment>
  ) :  (<Spinner />)
}

Order.propTypes = {
addOrder:PropTypes.func.isRequired,
auth:PropTypes.object.isRequired,
product:PropTypes.object.isRequired,
getProductById:PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  auth:state.auth,
  product:state.product
})
export default connect(mapStateToProps, { addOrder, getProductById })(Order);