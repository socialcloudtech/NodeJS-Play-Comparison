var Sequelize = require('sequelize-postgres').sequelize
var postgres  = require('sequelize-postgres').postgres

var sequelize = null,
	Test = null;

module.exports = {
	init: function (cb) {
		sequelize = new Sequelize('postgres', 'postgres', 'synerzip', {
  			dialect: 'postgres',
  			host: 'localhost',
  			port: 5432
		});
		Test = sequelize.import(__dirname + "\\models\\TestApp")
		Test.sync()
		//console.log(sequelize);
	}
}