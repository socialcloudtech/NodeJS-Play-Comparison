var pg = require('pg'),
    conString = "postgres://postgres:synerzip@localhost/postgres",
    client = null;

module.exports = {
	init: function (cb) {
		if(client !== null) {
			cb(null);
		}
		client = new pg.Client(conString);
		client.connect(function(err) {
			if(err) {
				console.log("Error while connecting. Error : " + err.message);
				cb(err);
			}
			console.log("Succesfully Connected");
			cb(null);
		});
	},
	getCoordinatesForId: function (id, format, cb) {
		var queryText = "SELECT name, start_date, x_coord, y_coord, z_coord, height FROM test_table WHERE id = " + id;
		var resultArray = [];
		var query = client.query(queryText);
		query.on('error', function(err) {
			if (err) {
				cb(404, '{"Error":"No record found for id = ' + id + '"}');
			}
		});
		query.on('row', function(row) {
			console.log('result row');
			var resObject = {};
			resObject["x_coord"] = row.x_coord;
			resObject["y_coord"] = row.y_coord;
			resObject["z_coord"] = row.z_coord;
			resultArray.push(resObject);
		});
		query.on('end', function(row) {
			console.log('result end');
			var resultString = null;
			if(format == 'JSON') {
				resultString = JSON.stringify(resultArray);
			}
			cb(200, resultString);
		});
	}
}
