var api = require('../service/api.js');

module.exports = function(server) {
	server.get('/coords/:id', api.respondCoordsId);
	server.get('/coords?^', api.respondWithQueryParams);
	server.get('/coords/height/lt/:val', api.respondForHeightLessThan);
	server.get('/coords/height/gt/:val', api.respondForHeightGreaterThan);
	server.get('/coords/product/all', api.respondForProductAll);
}