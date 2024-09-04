const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const Cart = require('../../model/Cart');
const Product = require('../../model/Product');

// @Path    POST /api/cart/:userId/add
// @Desc    Add product to cart by userId
// @Access  Private
router.post('/:userId/add', auth, async (req, res) => {
    const { userId } = req.params;
    const { productId, quantity } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ msg: 'Product not found' });

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
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @Path    DELETE /api/cart/:userId/remove/:productId
// @Desc    Remove product from cart by productId
// @Access  Private
router.delete('/:userId/remove/:productId', auth, async (req, res) => {
    const { userId, productId } = req.params;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => !item.productId.equals(productId));

        cart.totalPrice = cart.items.reduce((total, item) => {
            return total + item.quantity * item.product.price;
        }, 0);

        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @Path    GET /api/cart/:userId
// @Desc    Get cart by userId
// @Access  Private
router.get('/:userId', auth, async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

        res.status(200).json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
