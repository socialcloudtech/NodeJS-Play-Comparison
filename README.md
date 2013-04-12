NodeJS-Play-Comparison
======================
Comparing Node and Java Play framework based on an API service.

Scenario
========
1.  postgres db is used for storing the data. The number of rows can be configured.
2.  API service (in node or java play) listens for incoming requests. Based on requests the db is accessed and the data is returned in JSON format.
Node server uses [restify] (http://mcavage.github.io/node-restify/) to create a REST server.
3.  The tests are run using Apache Bench or JMeter
4.  The database, node-server, java play server and the client (JMeter or Apache Bench) are run on 4 Amazon EC2 instances.

The response time for the requests and the performance of servers is tested for the above setup.

REST URLS supported
===================

- GET /coords/id - get record id - returns X, Y, Z, height, start_date and name
- GET /coords?<query> - query is of type xlt=500&ygt=300&zgt=600 - The X/Y/Z params less/greater than a particular value - returns X, Y, Z
- GET /height/lt/val - get the height less than val - returns X, Y, Z and height
- GET /height/gt/:val' - get the height greater than val - returns X, Y, Z and height

The data is returned in JSON format for all above API's.
