const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const Cart = require('../../model/Cart');
const Product = require('../../model/Product');
//@Path   Post  /api/cart/:userId/add
//@Desc.   add cart by userId
//Access   private
router.post('/:userId/add',auth,async(req,res)=>{
    const { userId } = req.params;
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).send('Product not found');

    let cart = await Cart.findOne({ userId });
    if (!cart) {
        cart = new Cart({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
    if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
    } else {
        cart.items.push({ productId, quantity });
    }
    cart.totalPrice = cart.items.reduce((total, item) => {
        return total + item.quantity * product.price;
    }, 0);
    await cart.save();
    res.status(200).json(cart);
});

//@Path   Delete  /api/cart/:userId/remove/:productId
//@Desc.   Delete item from cart 
//Access   private
router.delete('/:userId/remove/:productId',auth,async(req,res)=>{
    const { productId } = req.params;
    const cart = await Cart.findOne({ userId:req.params.userId });
    if(!cart) {
        return res.status(404).json({ msg:'Cart not found' });
    }
    cart.items = cart.items.filter(item => !item.productId.equals(productId));

    await cart.save();
    res.json({ msg:'Item deleted' });
    res.status(200).json(cart);
});

//@Path   Get  /api/cart/:userId
//@Desc.   Delete item from cart 
//Access   private
router.get('/:userId',auth,async(req,res)=>{
    const userId = req.params.userId;
    try {
        const cart = await Cart.findOne({ userId:userId });
        if(!cart) {
            return res.status(404).json({ msg:'Cart not found' });
        }
        res.status(200).json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;