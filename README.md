NodeJS-Play-Comparison
======================
Comparing Node and Java Play framework based on API service.

Scenario
========
1.  postgres db is used for storing the data
2.  API service (in node or java play) listens for incoming requests. Based on requests the db is accessed and the data is returned in JSON format.
Node server uses [restify] (http://mcavage.github.io/node-restify/) to create a REST server.
3.  The tests are carried out using APache Bench or JMeter
4.  The database, node-server, java play server and the client (JMeter or Apache Bench) are run on a 4 Amazon EC2 instances.

The response time for the requests and the performance of servers is tested based on the above setup.