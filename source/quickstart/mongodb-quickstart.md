##MongonDB
----

文档[Document][]相当于行 （在javascript中可以表象为对象）
集合collection相当于表 （在javascript中可以表象为对象的数组）
多个集合构成一个数据库 （一个应用程序对应一个或多个数据库）

key字符串是大小写敏感的，[value][]是类型敏感的
自定义集合名字不能包含$, 不能以"system."开头
每个集合内部的所有文档的_id必须唯一，两个集合中可以相同
数据库名字不能包含$ \ /, 全部小写，最多64个字符

官方网址： http://www.mongodb.org/

[Document]:http://docs.mongodb.org/manual/core/document/
[value]:http://docs.mongodb.org/manual/reference/bson-types/

<!--more-->

----
###ubuntu测试过程 
(http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/)

####安装
	sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
	echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
	sudo apt-get update
	sudo apt-get install mongodb-org

####配置
Edit [/etc/mongodb.conf](http://docs.mongodb.org/manual/reference/configuration-options/)
	默认数据文件目录： /var/lib/mongodb
	默认日志文件目录： /var/log/mongodb
	默认日志保存方式： 覆盖
	默认端口： 27017 

####启动
启动服务器端(默认还会启动一个内置http服务器，默认端口28017)：
	$ mongod --dbpath ./data/ --logpath ./log/mongodb.log --logappend &
启动JavaScript shell：
	$ mongo  #支持所有javascript语法和mongo独有命令

####操作
	$ use mydb #切换数据库，如果数据库不存在，会创建新的
	$ db.user.insert({name:"xxx", age:18})  #如果collection不存在自动创建
	$ db.user.find()
	{ "_id" : ObjectId("549a6cae1cdcaf3b048887b8"), "age" : 18, "name" : "xxx" }
	
[CURD Operator](http://docs.mongodb.org/manual/crud/)
[Query Operator](http://docs.mongodb.org/manual/reference/operator/)
[Shell Methods](http://docs.mongodb.org/manual/reference/method/)
	
----
###在线测试
http://try.mongodb.org/?_ga=1.266362574.1339800818.1419400475

	
