const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Order = require('../../model/Order');
//@Path   Post  /api/order/add
//@Desc.   create new order
//Access   private
router.post('/add',auth, async (req, res) => {
  try {
    const { user, items, totalAmount } = req.body;

    const order = new Order({
      user,
      items,
      totalAmount,
    });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

//@Path   Get  /api/order
//@Desc.   Get all orders
//Access   private
router.get('/',auth,async(req,res)=>{
  try {
    const orders = await Order.find();
    if(!orders) {
      return res.status(401).json({ msg:'No orders' });
    }
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;