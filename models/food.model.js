const mongoose = require('mongoose');


const FoodSchema = mongoose.Schema({
    name: {
        type: String,
        required: "Name can't be empty"
    },
    description: String,
    unitPrice: {
        type: String,
        required: "Type can't be empty"
    },
    category: {
        type: String,
        required: "Category can't be empty"
    }
});

module.exports = mongoose.model('Food', FoodSchema);