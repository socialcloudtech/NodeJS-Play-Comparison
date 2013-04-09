var Sequelize = require('sequelize-postgres').sequelize,
	postgres  = require('sequelize-postgres').postgres,
	utils = require ("../utils"),
	config = require("../config/dbconfig");

process.on('uncaughtException', function(err){
	console.log("Uncaught Exception");
	console.log(err);
});

var sequelize = null,
	Test = null;

function tableInit() {
	Test.sync({force: false});
}

function getResultArray(paramsMap, result){
	var resultArray = [];
	//console.log(result["x_coord"]);
	//if ()
	for(var r in result) {
		var obj = {};
		for(p in paramsMap) {
			obj[paramsMap[p]] = result[r][p];
		}
		resultArray.push(obj);
	}
	console.log(resultArray);
	return resultArray;
}

module.exports = {
	/**
	* Inititialize the database connection.
	* @param {Object} cb : callback (error) : error is null if connection was successful
	*/
	init: function (cb) {
		sequelize = new Sequelize(config.db, config.username, config.password, {
			dialect: 'postgres',
			host: config.host,
			port: config.port,
			protocol: config.protocol
		});
		Test = sequelize.import(__dirname + "\\models\\TestApp");
		tableInit();
	},
	/**
	* Method to get the coordinates based on only id
	* @param {Object} id : id for which coordinates required
	* @param {Object} format : format in which data returned, currently supports only JSON
	* @param {Object} cb : callback(responseCode, resultString) : callback, provides response code and the string
	*/
	getCoordinatesForId: function (id, format, cb) {
		var queryText = "SELECT x_coord, y_coord, z_coord FROM test_table WHERE id = " + id;
		var paramsMap = {"x_coord": "X", "y_coord":"Y", "z_coord":"Z"};
		Test.find(id).success(function(result){
			//console.log(result);
			if(result == null) {
				cb (404, '{"Error":"No record with id = ' + id + ' found!"');
				return;
			}
			var resultArray = getResultArray(paramsMap, [result]);
			if(format == 'JSON') {
				resultString = JSON.stringify(resultArray);
			}
			//console.log(resultString);
			cb(200, resultString);
		}).error(function(err){
			cb (404, '{"Error":"' + err.message + '"');
			return;
		});
	},
	/**
	* Method to get the coordinates based on x, y, z values
	* @param {Object} query: the query string (coords?xlt=500&ygt=900), currently implementet for less than or greater than X/Y/Z constraints with AND conditional 
	* @param {Object} format : format in which data returned, currently supports only JSON
	* @param {Object} cb : callback(responseCode, resultString) : callback, provides response code and the string
	*/
	getCoordinatesForQuery: function(query, format, cb){
		var coordMap = {"xlt" : "x_coord < ?", "xgt": "x_coord > ?", "ylt" : "y_coord < ?", "ygt": "y_coord > ?", "zlt" : "z_coord < ?", "zgt": "z_coord > ?"};
		//var whereConditions = ["x_coord > ? AND y_coord > ?", query["xgt"], query["ygt"]];
		var paramsMap = {"x_coord": "X", "y_coord":"Y", "z_coord":"Z"};
		var whereConditions = [""];
		var i = 0, condition = "";
		for (q in query) {
			if(coordMap[q] == undefined) {
				cb(404, '{"Error":"Resource not Found"}');
				return;
			}
			var whereText = whereConditions[0];
			whereText += condition + " " + coordMap[q];
			whereConditions[0] = whereText;
			whereConditions.push(query[q]);
			if (i == 0){
				condition = " AND";
				i++;
			}
		}
		console.log(whereConditions);
		Test.findAll({where: whereConditions}).success(function(tests){
			//onsole.log(tests.length);
			if(tests == null) {
				cb (404, '{"Error":"No records found!"');
				return;
			}
			var resultArray = getResultArray(paramsMap, tests);
			var resultString = "{}";
			if(format == 'JSON') {
				resultString = JSON.stringify(resultArray);
			}
			cb(200, resultString);
		}).error(function(err){
			console.log(err);
			cb (500, '{"Error":"Internal Server Error"');
			return;
		});
	},
	/**
	* Method to get the coordinates based on only id
	* @param {Object} condn: lt (less than) or gt (greater than)
	* @param {Object} val: height
	* @param {Object} format : format in which data returned, currently supports only JSON
	* @param {Object} cb : callback(responseCode, resultString) : callback, provides response code and the string
	*/
	getValuesByHeight: function(condn, val, format, cb){
		var conditionMap = {"gt" : "height > ?", "lt": "height < ?"};
		var whereCondition =  [conditionMap[condn], val];
		//console.log(whereCondition);
		var paramsMap = {"x_coord": "X", "y_coord":"Y", "z_coord":"Z", "height":"height"};
		Test.findAll({where: whereCondition}).success(function(tests){
			//console.log(tests.length);
			if(tests == null) {
				cb (404, '{"Error":"No records found!"');
				return;
			}
			var resultArray = getResultArray(paramsMap, tests);
			var resultString = "{}";
			if(format == 'JSON') {
				resultString = JSON.stringify(resultArray);
			}
			cb(200, resultString);
		}).error(function(err){
			console.log(err);
			cb (500, '{"Error":"Internal Server Error"');
			return;
		});
	}
}