const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Order = require('../../model/Order');
const Product =require('../../model/Product');
//@Path   Post  /api/order/add
//@Desc.   create new order
//Access   private
router.post('/add',auth, async (req, res) => {
  try {
    const { user, items, totalAmount, product } = req.body;
    const order = new Order({
      user,
      items,
      totalAmount,
    });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

//@Path   Get  /api/order
//@Desc.   Get all orders
//Access   private
router.get('/',auth,async(req,res)=>{
  try {
    const orders = await Order.find();
    if (orders.length === 0) {
      return res.status(404).json({ msg: 'No orders found' }); // 404 is more appropriate for "No orders"
    }
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@Path   Get  /api/order/:id
//@Desc.   Get order by id
//Access   private
router.get('/:id',auth,async(req,res)=>{
  try {
    const order = await Order.findById(req.params.id);
    if(!order) {
      return res.status(404).json({ msg:'Order not found' });
    }
    res.json(order);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Order not found' });
    }
    res.status(500).send('Server Error');
  }
});

//@Path   Delete  /api/order/:id
//@Desc.   Delete order by id
//Access   private
router.delete('/:id',auth,async(req,res)=>{
  try {
    const order = await Order.findById(req.params.id);
    if(!order) {
      return res.status(404).json({ msg:'Order not found' });
    }
    await order.deleteOne();
    res.json({msg:'Order removed'});
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Order not found' });
    }
    res.status(500).send('Server Error');
  }
});


module.exports = router;