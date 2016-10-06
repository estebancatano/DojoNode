var express = require("express");
var router = express.Router();

var dbRestaurant = require('./queriesRestaurant');
var dbMenu = require('./queriesMenu')

router.get('/api/restaurants', dbRestaurant.getAllRestaurants);
router.get('/api/restaurants/:name', dbRestaurant.getRestaurantByName);
router.post('/api/restaurants', dbRestaurant.createRestaurant);
router.put('/api/restaurants/:id', dbRestaurant.updateRestaurant);
router.delete('/api/restaurants/:id', dbRestaurant.removeRestaurant);

router.get('/api/menu', dbMenu.getAllMenu);
router.get('/api/menu/:nameRestaurant', dbMenu.getMenuByRestaurant);
router.post('/api/menu', dbMenu.createMenu);
router.put('/api/menu/:id', dbMenu.updateMenu);
router.delete('/api/menu/:id', dbMenu.removeMenu);

module.exports = router;
