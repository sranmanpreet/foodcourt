const mongoose = require('mongoose');

const Order = mongoose.model('Order');
const Feedback = mongoose.model('Feedback');

module.exports.createFeedback = (req, res, next) => {
    let newFeedback = new Feedback({
        order: req.session.orderId,
        rating: req.body.rating
    });

    newFeedback.save((err, request) => {
        if (err) {
            return res.status(500).json({
                status: false,
                error: err.message
            });
        } else {
            return res.status(200).json(request);
        }
    });
}

module.exports.getFeedback = (req, res, next) => {
    Feedback.findOne({
        order: req.session.orderId
    }, (err, feedback) => {
        if (err) {
            return res.status(400).json({
                status: false,
                message: err.message + " ErrorCode-6102"
            });
        } else {
            return res.status(200).json(feedback);
        }
    }).populate('order');
}

module.exports.getFeedbacks = (req, res, next) => {
    Feedback.find((err, feedbacks) => {
        if (err) {
            return res.status(400).json({
                status: false,
                message: err.message + " ErrorCode-6102"
            });
        } else {
            return res.status(200).json(feedbacks);
        }
    }).populate('order');
}