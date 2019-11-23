const mongoose = require('mongoose');

const Food = mongoose.model('Food');

const MenuSchema = mongoose.Schema({
    name: {
        type: String,
        required: "Name can't be empty",
        unique: true
    },
    menuItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Food
    }]
});

module.exports = mongoose.model('Menu', MenuSchema);