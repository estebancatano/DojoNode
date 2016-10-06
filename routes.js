var express = require("express");
var router = express.Router();

var db = require('./queries');

router.get('/api/restaurants', db.getAllRestaurants);
router.get('/api/restaurants/:name', db.getRestaurantByName);
router.post('/api/restaurants', db.createRestaurant);
router.put('/api/restaurants/:id', db.updateRestaurant);
router.delete('/api/restaurants/:id', db.removeRestaurant);

module.exports = router;
