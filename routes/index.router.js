const express = require('express');
const router = express.Router();
const csrf = require('csurf');

const ctrlFood = require('../controllers/food.controller');
const ctrlMenu = require('../controllers/menu.controller');
const ctrlCart = require('../controllers/cart.controller');
const ctrlOrder = require('../controllers/order.controller');
const ctrlFeedback = require('../controllers/feedback.controller');

router.get('/test', (req, res, next) => {
    res.status(200).send('Success route connection');
});


// Food routes
router.get('/food-item/:id', ctrlFood.getFoodItemById);
router.get('/food-items/:category', ctrlFood.getFoodItemByCategory);
router.get('/food-items', ctrlFood.getAllFoodItems);
router.post('/food-item', ctrlFood.addFoodItem);
router.delete('/food-item/:id', ctrlFood.deleteFoodItem);

// Menu routes
router.get('/menus', ctrlMenu.getAllMenus);
router.get('/menu/:name', ctrlMenu.getMenuByName);
router.post('/menu', ctrlMenu.addMenu);
router.delete('/menu/:name', ctrlMenu.deleteMenu);

// Cart routes
router.post('/cart/add', ctrlCart.addCartItem);
router.get('/cart', ctrlCart.getCart);
router.delete('/cart', ctrlCart.deleteCart);

// Order routes
router.post('/order/create', ctrlOrder.createOrder);
router.get('/orders', ctrlOrder.getOrders);
router.get('/order', ctrlOrder.getOrder);

// Feedback routes
router.post('/feedback', ctrlFeedback.createFeedback);
router.get('/feedbacks', ctrlFeedback.getFeedbacks);
router.get('/feedback', ctrlFeedback.getFeedback);

module.exports = router;