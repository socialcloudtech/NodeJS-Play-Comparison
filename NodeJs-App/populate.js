//This script is used for populating the database. Databse contains configurable no. of rows

var pg = require('pg'); 

//console.log("length = [" + process.argv.length + "] ");

var conString = "tcp://postgres:synerzip:5432@localhost/postgres";
//var conString = "postgres://postgres:synerzip@localhost/postgres";
var client = new pg.Client(conString);

var CREATE_TABLE = "CREATE TABLE IF NOT EXISTS test_table(id SERIAL, name varchar(500) NOT NULL, start_date date NOT NULL, x_coord real NOT NULL, y_coord real NOT NULL, z_coord real NOT NULL, height real NOT NULL);";

var NUMBER_ROWS = 10000;

//function to get random dte. for simplicity, chooses a random index from an array
function randomDate() {
	var strings = ['2013-01-01', '2013-02-02', '2012-12-01', '2011-11-22'];
	var randomI = Math.floor(Math.random() * 10) % strings.length;
	console.log(randomI);
    return strings[randomI];
}

////function to get random string. for simplicity, chooses a random index from an array twice and returns concatenated string
function randomString() {
    //taking human readable strings
    var strings = ['abcdefghij', 'bcdefghija', 'cdefghijab', 'defghijabc', 'efghijabcd', 'fghijabcde', 'ghijabcdef', 'hijabcdefg', 'ijabcdefgh', 'jabcdefghi'];
    var randomI1 = Math.floor(Math.random() * 10);
    var randomI2 = Math.floor(Math.random() * 10);
    return strings[randomI1] + strings[randomI2];
}

//function to get a random real numnber
function randomReal() {
	return Math.random() * 1000;
}

//funtion to execute the insert row query
function insertRow(name, date, x, y , z, height, i) {
	var query = "INSERT INTO test_table (name, start_date, x_coord, y_coord, z_coord, height) VALUES ('" + name + "', '" + date + "', " + x + ", " + y + ", " + z + ", " + height + ")";
    console.log("insert query = " + query);
    client.query(query, function(err, result) {
    	if(err) {
    		console.log("Some error : " + err.message);
            return;    	
    	}
    	console.log("Succesfully done query " + i);
    });
}

//connect to the DB and populate after successful connection
client.connect(function(err) {
  if(err) {
  	console.log("Error while connecting. Error : " + err.message);
  	return;
  }
  console.log("Succesfully Connected");
  
  //do everything after a succesful connection
  //test query
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
      console.log(result.rows[0].theTime);
  });
  client.query(CREATE_TABLE, function(err, res) {
  	  if(err) {
  	  	console.log("Error while query [" + CREATE_TABLE + " ]" + " : " + err.message);
  	  	return;
  	  }
  	  console.log("Succesfully created table test_table");
  	  //console.log(res);
  });
  
  //insert rows
  for (var i = 0; i < NUMBER_ROWS; i++){
  	insertRow(randomString(), randomDate(), randomReal(), randomReal(), randomReal(), randomReal(), i);
  }
}); //connect end