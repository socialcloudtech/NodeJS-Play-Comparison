var pg = require('pg'),
	config = require("../config/dbconfig"),
    conString = conString = config.protocol + "://" + config.username + ":" + config.password + "@" + config.host + "/" + config.db,
    client = null,
    LIMIT = config.maxRows;

	//set pool-size as per config
    //console.log("poolsize = " + pg.defaults.poolSize);
    pg.defaults.poolSize = config.poolSize;

/**
 * Helper function to prepare array from data returned  from query
 * @author nachiket
 * @version 0.1.0
 * @param {String} queryText : the parameterized SQL statement for query
 * @param {Array} valueArray : array of values for the parameterized query
 * @param {Object} paramsMap : Mapping of column name and parameter name
 * @param {Function} cb : callback (resObject) : callback to call after completion, gives the result array
 */
function getResultArrayForQuery(queryText, valueArray, paramsMap, cb){
	var resultArray = [],
	    query = client.query(queryText, valueArray);
	query.on('error', function(err) {
		cb(err, null);
	});
	query.on('row', function(row) {
		//console.log('result row');
		var resObject = {};
		for(p in paramsMap) {
			if (p == 'product') {
				resObject['product'] = row['x_coord'] * row['y_coord'] * row['z_coord'];
			} else if(row[p]){
				resObject[paramsMap[p]] = row[p];
			}
			//resObject["y_coord"] = row.y_coord;
			//resObject["z_coord"] = row.z_coord;
		}
		resultArray.push(resObject);
	});
	query.on('end', function() {
		//console.log('result end');
		cb(null, resultArray);
	});
}

module.exports = {
	/**
	* Inititialize the database connection.
	* @author nachiket
	* @version 0.1.0
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
	* Method to get the record for an id
	* @author nachiket
	* @version 0.1.0
	* @param {Number} id : id for which coordinates required
	* @param {String} format : format in which data returned, currently supports only "JSON"
	* @param {Function} cb : callback(responseCode, resultString) : callback, provides response code and the string
	*/
	getCoordinatesForId: function (id, format, cb) {
		var queryText = "SELECT * FROM test_table WHERE id = $1";
		var paramsMap = {"x_coord": "X", "y_coord":"Y", "z_coord":"Z", "height":"height", "name":"name", "start_date":"start_date"};
		//example : http://localhost:8080/coords/1234
		//queryText = 'SELECT * FROM test_table WHERE id = $1;'
		//valueArray = [1234]
		getResultArrayForQuery(queryText, [id], paramsMap, function(err, resultArray) {
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
	* @author nachiket
	* @version 0.1.0
	* @param {String} query: the query string (coords?xlt=500&ygt=900), currently implementet for less than or greater than X/Y/Z constraints with AND conditional 
	* @param {String} format : format in which data returned, currently supports only "JSON"
	* @param {Function} cb : callback(responseCode, resultString) : callback, provides response code and the string
	*/
	getCoordinatesForQuery: function(query, format, cb){
		var coordMap = {"xlt" : "x_coord < $", "xgt": "x_coord > $", "ylt" : "y_coord < $", "ygt": "y_coord > $", "zlt" : "z_coord < $", "zgt": "z_coord > $"};
		var queryText = "SELECT x_coord, y_coord, z_coord from test_table WHERE";
		var valueArray = [];
		var i = 1, condition = "";
		for (q in query) {
			if(coordMap[q] == undefined) {
				cb(404, '{"Error":"Resource not Found"}');
				return;
			}
			queryText += condition + " " + coordMap[q] + i;
			valueArray.push(query[q]);
			if (i == 1){
				condition = " AND";
			} 
			i++;
		}
		queryText += "  LIMIT " + LIMIT + ";";
		//console.log(queryText);
		var paramsMap = {"x_coord": "X", "y_coord":"Y", "z_coord":"Z"};
		//example : http://localhost:8080/coords?xgt=990&ygt=900.00&zlt=100
		//queryText = 'SELECT x_coord, y_coord, z_coord FROM test_table WHERE x_coord >  $1 AND y_coord > $2 AND z_coord < $3';
		//valueArray = [990, 900, 100]
		//console.log(queryText);
		//console.log(valueArray);
		getResultArrayForQuery(queryText, valueArray, paramsMap, function(err, resultArray) {
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
	* @author nachiket
	* @version 0.1.0
	* @param {String} condn : lt (less than) or gt (greater than)
	* @param {Number} val : height
	* @param {String} format : format in which data returned, currently supports only "JSON"
	* @param {Function} cb : callback(responseCode, resultString) : callback, provides response code and the string
	*/
	getValuesByHeight: function(condn, val, format, cb){
		var conditionMap = {"gt" : "height > $1", "lt": "height < $1"};
		if(!(condn == 'gt' || condn == 'lt')) {
			cb (400, '{"Error":"lt or gt not provided"');
			return;
		}
		var queryText = "SELECT x_coord, y_coord, z_coord, height from test_table WHERE " + conditionMap[condn] + "  LIMIT " + LIMIT + ";";
		//console.log(queryText);
		var paramsMap = {"x_coord": "X", "y_coord":"Y", "z_coord":"Z", "height":"height"};
		//example : http://localhost:8080/height/gt/123
		//queryText = 'SELECT x_coord, y_coord, z_coord, height FROM test_table WHERE height > $1;'
		//valueArray = [123]
		getResultArrayForQuery(queryText, [val], paramsMap, function(err, resultArray) {
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
	* @author nachiket
	* @version 0.1.0
	* @param {String} format : format in which data returned, currently supports only "JSON"
	* @param {Function} cb : callback(responseCode, resultString) : callback, provides response code and the string
	*/
	getProductForAll: function(format, cb){
		var queryText = "SELECT * from test_table LIMIT " + LIMIT + ";";
		//console.log(queryText);
		var paramsMap = {"x_coord": "X", "y_coord":"Y", "z_coord":"Z", "height":"height", "product":"-"};
		getResultArrayForQuery(queryText, [], paramsMap, function(err, resultArray) {
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