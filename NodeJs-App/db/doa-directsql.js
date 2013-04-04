var pg = require('pg'),
    conString = "postgres://postgres:synerzip@localhost/postgres",
    client = null;

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
	getCoordinatesForQuery: function(query, format, cb){
		var coordMap = {"xlt" : "x_coord < ", "xgt": "x_coord > ", "ylt" : "y_coord < ", "ygt": "y_coord > ", "zlt" : "z_coord < ", "zgt": "z_coord > "};
		var queryText = "SELECT x_coord, y_coord, z_coord from test_table WHERE";
		var i = 0, condition = "";
		for (q in query) {
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
	}
}
