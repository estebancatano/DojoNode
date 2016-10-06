var promise = require('bluebird');

var options = {
	promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://bqnkffou:qkuC7uBLuCmnH8WAXYIXrYHeFrlSVjs5@elmer.db.elephantsql.com:5432/bqnkffou';
var db = pgp(connectionString);

function getAllMenu(req, res, next){
	db.any('select * from menu')
		.then(function(data){
			res.status(200)
				.json({
					status: 'Exitoso',
					data: data,
					message: 'Recuperados todos los menus'					
				});
		}).catch(function (err){
			return next(err);
		});
}

function getMenuByRestaurant(req, res, next){
	var restaurant = req.params.nameRestaurant;
  db.any('select * from menu where restaurant = $1', restaurant)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'Exitoso',
          data: data,
          message: 'Recuperados menu por restaurante'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createMenu(req, res, next){
	var name = req.body.name;
	var description = req.body.description;
  	var price = parseInt(req.body.price);
  	var restaurant = parseInt(req.body.restaurant);
  	db.none('insert into menu(name, description, price, restaurant)' +
      'values($1, $2, $3, $4)', [name, description, price, restaurant])
    .then(function () {
      res.status(200)
        .json({
          status: 'Exitoso',
          message: 'Insertado un menu'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateMenu(req, res, next){
	var id = parseInt(req.params.id);
	var name = req.body.name;
	var description = req.body.description;
  	var price = parseInt(req.body.price);
  	var restaurant = parseInt(req.body.restaurant);
	 db.none('update menu set name=$1, description=$2, price=$3, restaurant=$4 where id=$5',
    [name,description,price,restaurant,id])
    .then(function () {
      res.status(200)
        .json({
          status: 'Exitoso',
          message: 'Menu actualizado'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeMenu(req, res, next){
	var menuID = parseInt(req.params.id);
  	db.result('delete from menu where id = $1', menuID)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'Exitoso',
          message: 'Removido un menu'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports={
	getAllMenu: getAllMenu,
	getMenuByRestaurant: getMenuByRestaurant,
	createMenu: createMenu,
	updateMenu: updateMenu,
	removeMenu: removeMenu
};