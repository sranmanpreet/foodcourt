const mongoose = require('mongoose');

const Order = mongoose.model('Order');
const Cart = mongoose.model('Cart');

module.exports.createOrder = (req, res, next) => {
    if (req.session.cartId) {
        Cart.findOne({
            _id: req.session.cartId
        }, (err, cart) => {
            if (err) {
                return res.status(404).json({
                    status: false,
                    message: "No cart found",
                    error: err.message
                });
            } else {
                let orderItems = [];
                cart.cartItems.forEach(cartItem => {
                    orderItems.push({
                        food: cartItem.foodItem.name,
                        quantity: cartItem.quantity,
                        unitPrice: cartItem.foodItem.unitPrice
                    });
                });
                let date = new Date();
                let deliveryDate = date.setMinutes(date.getMinutes() + 30);
                if (req.body.deliveryDate) {
                    if (req.body.deliveryDate > date) {
                        deliveryDate = req.body.deliveryDate;
                    }
                }
                let newOrder = new Order({
                    orderItems: orderItems,
                    status: 'Placed',
                    deliveryDate: deliveryDate
                });
                newOrder.save((err, order) => {
                    if (err) {
                        return res.status(500).json({
                            status: false,
                            message: "Failed to place order. If problem persists, please contact administrator. ErrorCode- 8001",
                            error: err.message
                        });
                    } else {
                        req.session.orderId = order._id;
                        Cart.deleteOne({
                            _id: req.session.cartId
                        }, (err) => {
                            if (!err) {
                                req.session.cartId = '';
                                return res.status(200).json(order);
                            }
                        });
                    }
                });
            }
        }).populate({
            path: 'cartItems',
            populate: {
                path: 'foodItem'
            }
        });
    } else {
        return res.status(404).json({
            status: false,
            message: "No cart items found. Please add items to cart to place order."
        });
    }
}


module.exports.createOrder_chatbot = (req, res, next) => {
    if (req.body.userId) {
        Cart.findOne({
            userId: req.body.userId
        }, (err, cart) => {
            if (err) {
                return res.status(404).json({
                    status: false,
                    message: "No cart found",
                    error: err.message
                });
            } else {
                let orderItems = [];
                cart.cartItems.forEach(cartItem => {
                    orderItems.push({
                        food: cartItem.foodItem.name,
                        quantity: cartItem.quantity,
                        unitPrice: cartItem.foodItem.unitPrice
                    });
                });
                let date = new Date();
                let deliveryDate = date.setMinutes(date.getMinutes() + 30);
                if (req.body.deliveryDate) {
                    if (req.body.deliveryDate > date) {
                        deliveryDate = req.body.deliveryDate;
                    }
                }
                let newOrder = new Order({
                    orderItems: orderItems,
                    status: 'Placed',
                    deliveryDate: deliveryDate,
                    userId: req.body.userId
                });
                newOrder.save((err, order) => {
                    if (err) {
                        return res.status(500).json({
                            status: false,
                            message: "Failed to place order. If problem persists, please contact administrator. ErrorCode- 8001",
                            error: err.message
                        });
                    } else {
                        Cart.deleteOne({
                            _id: cart._id
                        }, (err) => {
                            if (!err) {
                                req.session.cartId = '';
                                return res.status(200).json(order);
                            }
                        });
                    }
                });
            }
        }).populate({
            path: 'cartItems',
            populate: {
                path: 'foodItem'
            }
        });
    } else {
        return res.status(404).json({
            status: false,
            message: "No cart items found. Please add items to cart to place order."
        });
    }
}

module.exports.getOrders = (req, res, next) => {
    Order.find().exec((err, orders) => {
        if (err) {
            return res.status(201).json();
        } else {
            return res.status(200).json(orders);
        }
    });
}

module.exports.getOrders_chatbot = (req, res, next) => {
    Order.find({ userId: req.query.userId }).exec((err, orders) => {
        if (err) {
            return res.status(201).json();
        } else {
            return res.status(200).json(orders);
        }
    });
}

module.exports.getOrder = (req, res, next) => {
    Order.findOne({ _id: req.session.orderId }).exec((err, orders) => {
        if (err) {
            return res.status(201).json();
        } else {
            return res.status(200).json(orders);
        }
    });
}

module.exports.getOrder_chatbot = (req, res, next) => {
    Order.findOne({ _id: req.query.orderId, userId: req.query.userId }).exec((err, orders) => {
        if (err) {
            return res.status(201).json();
        } else {
            return res.status(200).json(orders);
        }
    });
}

module.exports.getLatestOrder_chatbot = (req, res, next) => {
    Order.find({ userId: req.query.userId }, (err, orders) => {
        if (err) {
            return res.status(201).json();
        } else {
            return res.status(200).json(orders[0]);
        }
    }).sort({ _id: -1 }).limit(1);
}

module.exports.cancelOrder = (req, res, next) => {
    Order.findOne({
        _id: req.session.orderId
    }, (err, order) => {
        if (err)
            return res.status(500).json({
                status: false,
                message: err.message
            });
        else if (order) {
            if (order.status == 'Cancelled') {
                return res.status(201).json({
                    status: false,
                    message: "Order is already cancelled"
                });
            }
            if (order.status != 'Placed')
                return res.status(201).json({
                    status: false,
                    message: "Work intiated for the order. Order can't be cancelled"
                });
            else {
                Order.updateOne({
                    _id: req.session.orderId
                }, {
                    $set: {
                        status: 'Cancelled'
                    }
                }, (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            status: false,
                            message: err.message
                        });
                    } else {
                        return res.status(200).json({
                            status: true,
                            message: "Order cancelled"
                        });
                    }
                });
            }
        } else {
            return res.status(500).json({
                status: false,
                message: "Order not found"
            });
        }

    });
}