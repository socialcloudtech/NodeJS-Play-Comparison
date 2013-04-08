var Sequelize = require('sequelize-postgres').sequelize,
	postgres  = require('sequelize-postgres').postgres,
	utils = require ("../utils"),
	config = require("../config/dbconfig");


var sequelize = null,
	Test = null;

function tableInit(sequelize) {
	Test.sync({force: true});
	populateTable(Test);
}

module.exports = {
	init: function (cb) {
		sequelize = new Sequelize(config.db, config.username, config.password, {
			dialect: 'postgres',
			host: config.host,
			port: config.port,
			protocol: config.protocol
		});
		Test = sequelize.import(__dirname + "\\models\\TestApp");
	}
}