const express = require('express');
const router = express.Router();
const csrf = require('csurf');

const ctrlFood = require('../controllers/food.controller');
const ctrlMenu = require('../controllers/menu.controller');
const ctrlCart = require('../controllers/cart.controller');
const ctrlOrder = require('../controllers/order.controller');
const ctrlFeedback = require('../controllers/feedback.controller');

// Menu routes
router.get('/menus', ctrlMenu.getAllMenus);
router.get('/menu/:name', ctrlMenu.getMenuByName);

// Cart routes
router.post('/cart/add', ctrlCart.addCartItem_chatbot);
router.get('/cart', ctrlCart.getCartByUserId_chatbot);
router.delete('/cart', ctrlCart.deleteCartByUserId_chatbot);

// Order routes
router.post('/order/create', ctrlOrder.createOrder_chatbot);
router.get('/orders', ctrlOrder.getOrders_chatbot);
router.get('/order', ctrlOrder.getOrder_chatbot);
router.get('/order/latest', ctrlOrder.getLatestOrder_chatbot);

// Feedback routes
router.post('/feedback', ctrlFeedback.createFeedback_chatbot);
router.get('/feedback', ctrlFeedback.getFeedback_chatbot);

module.exports = router;