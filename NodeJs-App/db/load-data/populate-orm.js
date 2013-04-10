//This script is used for populating the database. Databse contains configurable no. of rows

var async = require("async"),
	utils = require("../../utils"),
    dataload = require("../doa-orm-sequelize"),
    Sequelize = require('sequelize-postgres').sequelize,
	postgres  = require('sequelize-postgres').postgres,
	sequelize = null,
	chainer = new Sequelize.Utils.QueryChainer,
	config = require("../../config/dbconfig"),
	NUMBER_ROWS = config.nrows;

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

var generateDataTable = function(client, cb) {
	console.log("in generate data table");
	var createAndFillTable = function() {
	}
	console.log("Hi");
	var DROP_TABLE = 'DROP TABLE test_table';
}

function createTable (cb) {
	sequelize = new Sequelize(config.db, config.username, config.password, {
  		dialect: 'postgres',
  		host: config.host,
  		port: config.port,
  		protocol: config.protocol
	});
	Test = sequelize.import(__dirname + "\\..\\models\\TestApp");
	Test.sync({force: true}).on('success', function(){
		console.log("Successfully Synced Test !");
		for(var i = 0; i < NUMBER_ROWS; i++) {
			chainer.add(Test.create({
					name: utils.randomString(),
					start_date: utils.randomDate(),
					x_coord: utils.randomReal(),
					y_coord: utils.randomReal(),
					z_coord: utils.randomReal(),
					height: utils.randomReal()
				}));
			}
			console.log("Begin to save " + NUMBER_ROWS + " items!");
			chainer.run().on('success', function() {
			console.log("finished");
				Test.count().on('success', function(count) {
					console.log("Counted " + count + " elements!");
				});
			});
		});
}

createTable(function(err){
	if(err) {
		console.log(err);
	} else {		
	}	
});