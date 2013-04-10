#Play-App#

This application is built using Java Play framework (v.2.0). The data access is done in one way and that is 

1. Direct SQL - using JDBC connection.

#Prerequisites#
Please have the following installed.

1. [JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html "Download JDK") 6 or later.
2. [postgresql 9.2 db](http://www.postgresql.org/ "Download postgresql")
3. Java [Play](http://www.playframework.com/download "Download Play") Framework.

#Download and Setting up Java Play#

Download the latest Java [Play binary package](http://www.playframework.com/download "Download Play"). Here We've used version 2.0 so download the exact version would be the best. Once download is finished, extract the archive to a location where you've both the read and write permission.

####Add the play script to PATH####
-----------------------------------
1. On Windows you’ll need to set it in the global environment variables. This means update the PATH in the environment variables and don’t use a path with spaces.
2. On Mac OS follow the below mentioned steps.

+ Open Terminal
+ $ cd ~
+ $ touch .bash_profile
+ $ vim .bash_profile
+ export PATH=$PATH:/absolute/path/to/play
+ $ . .bash_profile

To check that the play command is available hit the following command from shell

+ $ play help

####Setting up the DB####
-----------------------------------
1. Go to Play-App/conf/
2. Open application.conf file

Now change the values for the following variables.

+ db.default.driver=org.postgresql.Driver 
+ db.default.url="postgres://username:password@localhost/DBName"
+ db.default.user=username
+ db.default.password=password

Detailed information are at [SettingJDBC](http://www.playframework.com/documentation/2.0/SettingsJDBC "SettingJDBC")
