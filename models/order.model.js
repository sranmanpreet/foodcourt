const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    orderItems: [{
        food: {
            type: String,
            required: true
        },
        unitPrice: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        }
    }],
    total: {
        type: Number
    },
    date: {
        type: Date
    },
    status: {
        type: String,
        enum: ['Placed', 'Preparing', 'Ready', 'Cancelled']
    },
    deliveryDate: {
        type: Date
    },
    paymentReferenceId: {
        type: String
    }
});

//Events
OrderSchema.pre('save', function(next) {
    this.total = this.calculateOrderTotal(this.orderItems);
    this.date = new Date();
    this.paymentReferenceId = this.getRandomNumber();
    next();
});

// Methods
OrderSchema.methods.calculateOrderTotal = function(orderItems) {
    var total = 0;
    orderItems.forEach(element => {
        total = total + element.price * element.quantity;
    });
    return Math.round(total);
}

OrderSchema.methods.getRandomNumber = function() {
    const temp = '' + Math.round((new Date()).getTime() / 1000) + Math.floor(Math.random() * Math.floor(1000));
    const shuffled = temp.split('').sort(function() { return 0.5 - Math.random() }).join('');
    return ('FC' + shuffled);
}

module.exports = mongoose.model('Order', OrderSchema);