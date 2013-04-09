var api = require('../service/api.js');

module.exports = function(server) {
	server.get('/coords/:id', api.respondCoordsId);
	server.get('/coords?^', api.respondWithQueryParams);
	server.get('/height/lt/:val', api.respondForHeightLessThan);
	server.get('/height/gt/:val', api.respondForHeightGreaterThan);
}