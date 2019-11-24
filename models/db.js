const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    user: process.env.MONGODB_USER,
    pass: process.env.MONGODB_PASS,
    useNewUrlParser: true
}, (err) => {
    if (!err) {
        console.log('MongoDB connection succeeded.');
    } else {
        console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2));
    }
});

require('./food.model');
require('./menu.model');
require('./cartItem.model');
require('./cart.model');