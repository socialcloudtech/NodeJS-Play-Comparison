//Server listening on port 8080 for API requests.
var restify = require('restify');
var data = require('./test_data');

function respondCoordsId(req, res, next) {
	var id = req.params["id"];
	//check sanity of id
	data.getCoordinatesForId(id, 'JSON', function(responseCode, resultJSON) {
		res.send(responseCode, resultJSON);
		next();
	});
}

var server = restify.createServer();
server.get('/coords/:id', respondCoordsId);

data.init(function(err){
	if(err){
		console.log("Some error while db initialization : " + err.message);
		return;
	}
	console.log("Successfully initialized DB");
});

server.listen(8080, function() {
	console.log('%s listening at %s', server.name, server.url);
});