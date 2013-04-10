//This script is used for populating the database. Databse contains configurable no. of rows

var async = require("async"),
	utils = require("../../utils"),
	config = require("../../config/dbconfig"),
	pg = require('pg'),
    conString = config.protocol + "://" + config.username + ":" + config.password + "@" + config.host + "/" + config.db,
    NUMBER_ROWS = config.nrows
    client = null,
    dataload = require("../doa-directsql");

//var pg = require('pg');
//var conString = "tcp://postgres:synerzip:5432@localhost/postgres";
//var conString = "postgres://postgres:synerzip@localhost/postgres";
//var client = new pg.Client(conString);

//funtion to execute the insert row query
function insertRow(name, date, x, y , z, height, i, client, cb) {
	var query = "INSERT INTO test_table (name, start_date, x_coord, y_coord, z_coord, height) VALUES ('" + name + "', '" + date + "', " + x + ", " + y + ", " + z + ", " + height + ")";
    console.log("insert query = " + query);
    client.query(query, function(err, result) {
    	if(err) {
    		console.log("Some error : " + err.message);
            //return;
    	} else {
    		console.log("Succesfully done query " + i);
    	}
    	cb(err);
    });
}

var generateDataTable = function(nRows, client, cb) {
	NUMBER_ROWS = nRows;
	console.log("in generate data table");
	var createAndFillTable = function() {
		var CREATE_TABLE = "CREATE TABLE IF NOT EXISTS test_table(id SERIAL, name varchar(500) NOT NULL, start_date date NOT NULL, x_coord real NOT NULL, y_coord real NOT NULL, z_coord real NOT NULL, height real NOT NULL);";
		client.query(CREATE_TABLE, function(err, res) {
  			if(err) {
  				console.log("Error while query [" + CREATE_TABLE + " ]" + " : " + err.message);
  				cb(err);
  				return;
  			}
  			console.log("Succesfully created table test_table");
  			//console.log(res);
			//insert rows
			var count = 0;
			async.whilst(
				function (){
					return (count < NUMBER_ROWS) ;
				},
				function (acb) {
					insertRow(utils.randomString(),
							utils.randomDate(),
							utils.randomReal(),
							utils.randomReal(),
							utils.randomReal(),
							utils.randomReal(),
							count, client, acb);
					count++;
				},
				function (err) {
					console.log("Completing whilst : err = ");
					console.log(err);
					console.log("Calling callback !");
					cb(err);
				}
			);
		});
	}
	console.log("Hi");
	var DROP_TABLE = 'DROP TABLE test_table';
	client.query(DROP_TABLE, function(err, res){
		if(err) {
			console.log("Error while drop table !");
			console.log(err);
			cb(err);
		} else {
			console.log("Calling create and fill table");
			createAndFillTable();
		}
	});
}

function createTable (cb) {
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
		generateDataTable(NUMBER_ROWS, client, function(err) {
			cb(err);
		});
	});
}

createTable(function(err){
	if(err) {
		console.log(err);
	} else {
		console.log("Successfully created table !");
		return;		
	}	
});