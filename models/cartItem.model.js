const mongoose = require('mongoose');

const Food = mongoose.model('Food');

const CartItemSchema = mongoose.Schema({
    quantity: {
        type: Number,
        required: "Quantity can't be empty"
    },
    foodItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Food
    }
});

module.exports = mongoose.model('CartItem', CartItemSchema);