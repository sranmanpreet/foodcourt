const mongoose = require('mongoose');

const Food = mongoose.model('Food');
const Menu = mongoose.model('Menu');

module.exports.addMenu = (req, res) => {
    let newMenu = new Menu({
        name: req.body.name,
        menuItems: req.body.menuItems
    });
    newMenu.save((err, menu) => {
        if (err) {
            return res.status(200).send(err);
        } else {
            return res.status(200).send('Menu created');
        }
    });
}

module.exports.getMenuByName = (req, res) => {
    Menu.findOne({
        name: req.params.name
    }, (err, menu) => {
        if (menu) {
            return res.status(200).send(menu);
        } else {
            return res.send(err);
        }
    }).populate('menuItems');
}

module.exports.getAllMenus = (req, res) => {
    Menu.find((err, menus) => {
        return res.status(200).send(menus);
    }).populate('menuItems');
}

module.exports.deleteMenu = (req, res) => {
    Menu.deleteOne({
        name: req.params.name
    }, (err, food) => {
        if (err) {
            return res.status(203).send(err);
        } else {
            return res.status(200).send('Menu deleted');
        }
    });
}