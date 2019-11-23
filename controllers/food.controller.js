const mongoose = require('mongoose');

const Food = mongoose.model('Food');

module.exports.addFoodItem = (req, res) => {
    let newFoodItem = new Food({
        name: req.body.name,
        description: req.body.description,
        unitPrice: req.body.unitPrice,
        category: req.body.category
    });
    newFoodItem.save((err, foodItem) => {
        if (err) {
            return res.status(203).send(err);
        } else {
            return res.status(200).send('Item added');
        }
    });

}

module.exports.getFoodItemById = (req, res) => {
    Food.findOne({
        _id: req.params.id
    }, (errCart, foodItem) => {
        if (foodItem) {
            return res.status(200).json(foodItem);
        } else {
            return res.status(401).send();
        }
    });
}

module.exports.getFoodItemByCategory = (req, res) => {
    Food.find({
        category: req.params.category
    }, (err, foodItems) => {
        if (foodItems) {
            return res.status(200).send(foodItems);
        } else {
            return res.send(err);
        }
    })
}

module.exports.getAllFoodItems = (req, res) => {
    Food.find((err, foodItems) => {
        return res.status(200).send(foodItems);
    });
}

module.exports.deleteFoodItem = (req, res) => {
    Food.deleteOne({
        _id: req.params.id
    }, () => {
        return res.status(200).send('Item deleted');
    });
}