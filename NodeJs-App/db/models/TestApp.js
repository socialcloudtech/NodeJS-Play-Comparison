module.exports = function(sequelize, DataTypes) {
  //console.log(sequelize);
  //console.log(DataTypes);
  console.log("start def");
  var defined = sequelize.define("test_table", {
  	id: {
  		type: DataTypes.INTEGER,
  		primaryKey: true
  	},
    name: {
    	type: DataTypes.STRING
    },
    start_date: {
    	type: DataTypes.DATE
    },
    x_coord: {
    	type: DataTypes.FLOAT
    },
    y_coord: {
    	type: DataTypes.FLOAT
    },
    z_coord: {
    	type: DataTypes.FLOAT
    },
    height: {
    	type: DataTypes.FLOAT
    }
  },
  {
  	name: 'test_table',
  	timestamps: false,
  	
  });
  console.log("end def");
  return defined;
}