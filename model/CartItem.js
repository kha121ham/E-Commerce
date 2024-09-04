const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    quantity: { type: Number, required: true, min: 1 },
});

module.exports = CartItemSchema;
