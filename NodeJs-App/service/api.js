//TODO : Use environment variable to choose between simple sql and ORM.
//var data = require('../db/doa-orm-sequelize');
var data = require('../db/doa-directsql');

//inititialize db
data.init(function(err){
	if(err){
		console.log("Some error while db initialization : " + err.message);
		return;
	}
	console.log("Successfully initialized DB");
});

module.exports = {
	/**
	* Handler for /coords/id route
	* @author nachiket
	* @version 0.1.0
	* @param {Object} req : object representing the http request
	* @param {Object} res : object for the response
	* @param {Function} next : must be called so that the next handler in chain is invoked.
	*/
	respondCoordsId: function(req, res, next) {
		var id = req.params["id"];
		data.getCoordinatesForId(id, 'JSON', function(responseCode, resultJSON) {
			res.send(responseCode, resultJSON);
			return next();
		});
	},
	/**
	* Handler for the /coords? route
	* @author nachiket
	* @version 0.1.0
	* @param {Object} req : object representing the http request
	* @param {Object} res : object for the response
	* @param {Function} next : must be called so that the next handler in chain is invoked.
	*/
	respondWithQueryParams: function(req, res, next) {
		//console.log('query = ');
		data.getCoordinatesForQuery(req.query, 'JSON', function(responseCode, result){
			res.send(responseCode, result);
			return next();
		});
	},
	/**
	* Handler for the /coords/height/gt/:val route
	* @author nachiket
	* @version 0.1.0
	* @param {Object} req : object representing the http request
	* @param {Object} res : object for the response
	* @param {Function} next : must be called so that the next handler in chain is invoked.
	*/
	respondForHeightGreaterThan: function(req, res, next) {
		//console.log('query = ');
		var val = req.params["val"];
		data.getValuesByHeight("gt", val, 'JSON', function(responseCode, result){
			res.send(responseCode, result);
			return next();
		});
	},
	/**
	* Handler for the /coords/height/lt/:val route
	* @author nachiket
	* @version 0.1.0
	* @param {Object} req : object representing the http request
	* @param {Object} res : object for the response
	* @param {Function} next : must be called so that the next handler in chain is invoked.
	*/
	respondForHeightLessThan: function(req, res, next) {
		//console.log('query = ');
		var val = req.params["val"];
		data.getValuesByHeight("lt", val, 'JSON', function(responseCode, result){
			res.send(responseCode, result);
			return next();
		});
	},
	/**
	* Handler for the /coords/product/all route
	* @author nachiket
	* @version 0.1.0
	* @param {Object} req : object representing the http request
	* @param {Object} res : object for the response
	* @param {Function} next : must be called so that the next handler in chain is invoked.
	*/
	respondForProductAll: function(req, res, next) {
		data.getProductForAll('JSON', function(responseCode, result){
			res.send(responseCode, result);
			return next();
		});
	}
}