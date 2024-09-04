const mongoose = require('mongoose');
const CartItemSchema = require('./CartItem'); // Ensure the path is correct

const CartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    items: [CartItemSchema], // Use CartItemSchema correctly here
    totalPrice: { type: Number, default: 0 }
}, { timestamps: true });

const Cart = mongoose.model('cart', CartSchema);
module.exports = Cart;
