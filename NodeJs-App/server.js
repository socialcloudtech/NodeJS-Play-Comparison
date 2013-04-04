//Server listening on port 8080 for API requests.
var restify = require('restify');

//create api server
var server = restify.createServer();
server.use(restify.queryParser());

//Routing. This will internally initialize api services
require('./config/routes')(server);

//start server
server.listen(8080, function() {
	console.log('%s listening at %s', server.name, server.url);
});