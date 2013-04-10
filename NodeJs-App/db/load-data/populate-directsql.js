//This script is used for populating the database. Database contains configurable no. of rows

var async = require("async"),
	utils = require("../utils"),
	config = require("../../config/dbconfig"),
	pg = require('pg'),
    conString = config.protocol + "://" + config.username + ":" + config.password + "@" + config.host + "/" + config.db,
    NUMBER_ROWS = config.nrows
    client = null,
    dataload = require("../doa-directsql");

/**
 * Helper function to insert given values into table
 * @author nachiket
 * @version 0.1.0
 * @param {String} name : name field
 * @param {String} date : date field - yyyy-mm-dd
 * @param {Number} x : x coordinate - floating number
 * @param {Number} y : y coordinate - floating number
 * @param {Number} z : z coordinate - floating number
 * @param {Number} height : height coordinate - floating number
 * @param {Function} cb : callback (err) : callback to call after completion, err is null on success.
 */
function insertRow(name, date, x, y, z, height, i, client, cb) {
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

/**
 * Helper function to insert given values into table
 * @author nachiket
 * @version 0.1.0
 * @param {Object} client : pg client after successful connection
 * @param {Function} cb : callback after all rows are inserted. err is null on success
 */
function generateDataTable (client, cb) {
	//callback function after succesful deletion of first table
	var createAndFillTable = function() {
		var CREATE_TABLE = 'CREATE TABLE IF NOT EXISTS "test_table" ("id"   SERIAL , "name" VARCHAR(255), "start_date" TIMESTAMP WITH TIME ZONE, "x_coord" FLOAT, "y_coord" FLOAT, "z_coord" FLOAT, "height" FLOAT, PRIMARY KEY ("id"))';
		//var CREATE_TABLE = "CREATE TABLE IF NOT EXISTS test_table(id SERIAL, name varchar(500) NOT NULL, start_date date NOT NULL, x_coord real NOT NULL, y_coord real NOT NULL, z_coord real NOT NULL, height real NOT NULL);";
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
	//drop existing table adn create new
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

/**
 * Function to create and fill the table
 * @author nachiket
 * @version 0.1.0
 * @param {Function} cb : callback function after completion. err is null on success
 */
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
		generateDataTable(client, function(err) {
			cb(err);
		});
	});
}

// Generate the db
createTable(function(err){
	if(err) {
		console.log(err);
	} else {
		console.log("Successfully created table !");
		return;		
	}	
});