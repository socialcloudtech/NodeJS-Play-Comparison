NodeJS Test Application
=======================
NodeJS API server using restify and postgresql as DB. The data access is done in 2 ways:

1.  Direct SQL - using the 'pg' module
2.  ORM - using the 'sequelize' module with postgres as dialect

Prerequisites
=============
Please have the following installed

1.  [postgresql 9.2 db] (http://www.postgresql.org "postgresql 9.2 db")
2.  [nodejs] (http://nodejs.org "nodejs")
3.  [npm] (https://npmjs.org/ "npm")

General Setup
=============

0.  Checkout the repo. Change the current working directory to the NodeJs-App directory 
1.  run 'npm install'. This will install dependencies like [pg] (https://github.com/brianc/node-postgres), [async] (https://github.com/caolan/async), [resttify] (https://github.com/mcavage/node-restify), [sequelize] (https://github.com/sequelize)
Setting up the DB
=================
The below instructions should be used on the machine where DB is going to be hosted.

1.  Open up the file config/dbconfig.js
2.  Parameters like database-name ("db"), host, port, password, username and protocol have been setup with default values. Change as required. Also, the number of rows can be set as required, default value is 10000
3.  Run the command 'node db/populate/populate-directsql.js'. This will populate the db with given number fo rows.

Start the Server
================

On the machine where nodejs server is running, edit the dbconfig file and setup the postgres db parameters as per the location of db.
Then execute the command:
node server.js

This will start a server on localhost port 8080.