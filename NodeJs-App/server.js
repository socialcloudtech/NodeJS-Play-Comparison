//code snippet from the pg github repo as a start point.

var pg = require('pg'); 
var restify = require('restify');

//var conString = "tcp://postgres:synerzip:5432@localhost/postgres";
var conString = "postgres://postgres:synerzip@localhost/postgres"

var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
  	console.log("Error while connecting. Error : " + err.message);
  	return;
  }
  console.log("Succesfully Connected");
});

function respondJSONById(response, next, id){
	var queryText = "SELECT name, start_date, x_coord, y_coord, z_coord, height FROM test_table WHERE id = " + id;
	var resultArray = [];
	var query = client.query(queryText);
	response.contentType = 'json';
	query.on('error', function(err){
		if(err){
			response.send(500, '{"Error":"No record found for id = ' + id + '"}');
			next();
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
	query.on('end', function(row){
		console.log('result end');
		var resultString = JSON.stringify(resultArray);
		response.send(200, resultString);
	});
}

function respond(req, res, next) {
  var id = req.params["id"];
  //check sanity of id
  respondJSONById(res, next, id);
}

var server = restify.createServer();
server.get('/coords/:id', respond);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});