var pg = require('pg'),
	config = require("../config/dbconfig"),
    conString = conString = config.protocol + "://" + config.username + ":" + config.password + "@" + config.host + "/" + config.db,
    client = null;

var NUMBER_ROWS = 10000;

/**
 * Helper function to prepare array from data returned  from query
 * @param {Object} queryText : the SQL statement for query
 * @param {Object} paramsMap : Mapping of column name and parameter name
 * @param {Obejct} cb : callback (resObject) : callback to call after completion, gives the result array
 */
function getResultArrayForQuery(queryText, paramsMap, cb){
	var resultArray = [],
	    query = client.query(queryText);
	query.on('error', function(err) {
		cb(err, null);
	});
	query.on('row', function(row) {
		console.log('result row');
		var resObject = {};
		for(p in paramsMap) {
			resObject[paramsMap[p]] = row[p];
			//resObject["y_coord"] = row.y_coord;
			//resObject["z_coord"] = row.z_coord;
		}
		resultArray.push(resObject);
	});
	query.on('end', function(row) {
		console.log('result end');
		cb(null, resultArray);
	});
}

module.exports = {
	/**
	* Inititialize the database connection.
	* @param {Object} cb : callback (error) : error is null if connection was successful
	*/
	init: function (cb) {
		if(client !== null) {
			cb(null);
			return;
		}
		client = new pg.Client(conString);
		client.connect(function(err) {
			if(err) {
				console.log("Error while connecting. Error : " + err.message);
				cb(err);
				return;
			}
			console.log("Succesfully Connected");
			cb(null);
		});
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
		getResultArrayForQuery(queryText, paramsMap, function(err, resultArray) {
			if(err) {
				cb (404, '{"Error":"' + err.message + '"');
				return;
			}
			if(format == 'JSON') {
				resultString = JSON.stringify(resultArray);
			}
			cb(200, resultString);
		});
	},
	/**
	* Method to get the coordinates based on X, Y, Z
	* @param {Object} query: the query string (coords?xlt=500&ygt=900), currently implementet for less than or greater than X/Y/Z constraints with AND conditional 
	* @param {Object} format : format in which data returned, currently supports only JSON
	* @param {Object} cb : callback(responseCode, resultString) : callback, provides response code and the string
	*/
	getCoordinatesForQuery: function(query, format, cb){
		var coordMap = {"xlt" : "x_coord < ", "xgt": "x_coord > ", "ylt" : "y_coord < ", "ygt": "y_coord > ", "zlt" : "z_coord < ", "zgt": "z_coord > "};
		var queryText = "SELECT x_coord, y_coord, z_coord from test_table WHERE";
		var i = 0, condition = "";
		for (q in query) {
			if(coordMap[q] == undefined) {
				cb(404, '{"Error":"Resource not Found"}');
			}
			queryText += condition + " " + coordMap[q] + query[q];
			if (i == 0){
				condition = " AND";
				i++;
			} 
		}
		queryText += ";";
		console.log(queryText);
		var paramsMap = {"x_coord": "X", "y_coord":"Y", "z_coord":"Z"};
		getResultArrayForQuery(queryText, paramsMap, function(err, resultArray) {
			if(err) {
				cb (404, '{"Error":"' + err.message + '"');
				return;
			}
			if(format == 'JSON') {
				resultString = JSON.stringify(resultArray);
			}
			cb(200, resultString);
		});
	},
	/**
	* Method to get the coordinates based on height
	* @param {Object} lt (less than) or gt (greater than)
	* @param {Object} val: height
	* @param {Object} format : format in which data returned, currently supports only JSON
	* @param {Object} cb : callback(responseCode, resultString) : callback, provides response code and the string
	*/
	getValuesByHeight: function(condn, val, format, cb){
		var conditionMap = {"gt" : "height > ", "lt": "height < "};
		var queryText = "SELECT x_coord, y_coord, z_coord, height from test_table WHERE " + conditionMap[condn] + val;
		//console.log(queryText);
		var paramsMap = {"x_coord": "X", "y_coord":"Y", "z_coord":"Z", "height":"height"};
		getResultArrayForQuery(queryText, paramsMap, function(err, resultArray) {
			if(err) {
				cb (404, '{"Error":"' + err.message + '"');
				return;
			}
			if(format == 'JSON') {
				resultString = JSON.stringify(resultArray);
			}
			cb(200, resultString);
		});
	}
}