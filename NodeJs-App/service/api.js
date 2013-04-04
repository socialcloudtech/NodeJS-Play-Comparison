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
	respondCoordsId: function(req, res, next) {
		var id = req.params["id"];
		data.getCoordinatesForId(id, 'JSON', function(responseCode, resultJSON) {
			res.send(responseCode, resultJSON);
			return next();
		});
	},
	respondWithQueryParams: function(req, res, next) {
		console.log('query = ');
		console.log(req.query.xlt);
		data.getCoordinatesForQuery(req.query, 'JSON', function(responseCode, result){
			res.send(responseCode, result);
			return next();
		});
	}
}