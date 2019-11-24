const mongoose = require('mongoose');

const Food = mongoose.model('Food');
const CartItem = mongoose.model('CartItem');

const CartSchema = mongoose.Schema({
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: CartItem
    }],
    total: {
        type: Number
    }
});

//Events
CartSchema.pre('save', async function(next) {
    if (this.items.length) {
        await this.calculateTotal(this.items).then(x => {
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
                    console.log(err);
                }
            });

            if (cartItemO) {
                await Food.findOne({ _id: cartItemO.item }, (err, food) => {
                    if (food) {
                        unitPrice = food.unitPrice;
                    } else {
                        console.log(err);
                    }
                });
            }
            total = total + unitPrice * quantity;
            console.log(total + '    total');
        }
        return total;
    }
}

module.exports = mongoose.model('Cart', CartSchema);