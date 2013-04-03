//code snippet from the pg github repo as a start point.

var pg = require('pg'); 

var conString = "tcp://postgres:synerzip:5432@localhost/postgres";

var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
  	console.log("Error while connecting. Error : " + err.message);
  	return;
  }
  console.log("Succesfully Connected as superuser postgres");
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
      console.log(result.rows[0].theTime);
  });
});

