const mongoose = require('mongoose');

const Order = mongoose.model('Order');

const Feedback = mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Order
    },
    rating: {
        required: true,
        type: Number
    },
    createdDate: {
        type: Date
    }
});

//Events
Feedback.pre('save', function(next) {
    this.createdDate = new Date();
    next();
});

module.exports = mongoose.model('Feedback', Feedback);