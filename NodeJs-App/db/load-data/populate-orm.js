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

/**
 * Function to create and fill the table
 * @param {Function} cb : callback function after completion. err is null on success
 */
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
			cb(null);
		});
	}).on('error', function(err) {
		cb(err);
	});
}

//generate the DB
createTable(function(err){
	if(err) {
		console.log(err);
	} else {
		console.log("Succesfully created and populated the tables !");		
	}	
});