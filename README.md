# Foodcourt
Server API's can be used to handle cart transactions, receive food orders, schedule orders for future, get food menu. Application can be further enhanced to support payments.

# Features!
  - Cart
  - Payments
  - Place Orders
  - Receive Order Feedbacks
  - Schedule orders
  - Order Tracking
  - Menu
  - Supports NoSQL Database


### Tech

Application uses a number of open source projects to work properly:

* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework
* [MongoDB] - A NoSQL database

### Installation

Application requires [Node.js](https://nodejs.org/) v4+ to run.

Setup database and provide database configuration in ``hunar_app/config/config.json``
```sh
        "MONGODB_URI": "mongodb://localhost:27017/hunar?authSource=admin",
        "MONGODB_USER": "admin",
        "MONGODB_PASS": "password"
```
Install the dependencies and devDependencies and start the server.

```sh
$ npm install -d
$ node app
```

For production environments...

```sh
$ npm install --production
$ NODE_ENV=production node app
```


License
----

MIT


**Free Software, Hell Yeah!**

**Suggestions/Improvements are welcome. Want to develop together? You are most welcome.**


[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [Angular Material Design]: <https://material.angular.io/>
   [express]: <http://expressjs.com>
   [Angular]: <https://angular.io/>
   [MongoDB]: <https://www.mongodb.com/>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>
