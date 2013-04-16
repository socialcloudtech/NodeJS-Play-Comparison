module.exports = {
	db: "postgres", //name of database
	host: "localhost", //hostname
	port: 5432, //port
	password: "", //password if any
	username: "postgres", //username
	protocol: "postgres", //protocol - tcp, postgres etc
	nrows: 10000, //no. of rows - while populatin the db
	poolSize: 20 //max number of connections in pool
}
