const mongoose = require('mongoose');

const Food = mongoose.model('Food');
const CartItem = mongoose.model('CartItem');

const CartSchema = mongoose.Schema({
    cartItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: CartItem
    }],
    total: {
        type: Number
    }
});

//Events
CartSchema.pre('save', async function(next) {
    if (this.cartItems.length) {
        await this.calculateTotal(this.cartItems).then(x => {
            this.total = x;
        });
    }
    next();
});

// Methods
CartSchema.methods.calculateTotal = async(cartItems) => {
    if (cartItems) {
        var total = 0;
        for (const element of cartItems) {
            var unitPrice = 0;
            var quantity = 0;
            var cartItemO = '';
            await CartItem.findOne({ _id: element }, (err, cartItem) => {
                if (cartItem) {
                    cartItemO = cartItem;
                    quantity = cartItem.quantity;
                } else {
                    console.log('in else first');
                    console.log(err);
                }
            });

            if (cartItemO) {
                await Food.findOne({ _id: cartItemO.foodItem }, (err, food) => {
                    if (food) {
                        unitPrice = food.unitPrice;
                    } else {
                        console.log('in else second');
                        console.log(err);
                    }
                });
            }
            total = total + unitPrice * quantity;
        }
        return total;
    }
}

module.exports = mongoose.model('Cart', CartSchema);