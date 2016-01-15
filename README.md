# Keg
Keg: An open source URL shortener.

# Getting Started

## Install Dependencies

### Back-End

* **Install [CouchDB](http://couchdb.apache.org/)**

```
$ sudo apt-get install couchdb
``` 

The default port CouchDB uses is 5984 hence you can ping it on http://localhost:5984/ and access the [Futon](http://docs.couchdb.org/en/1.6.1/intro/futon.html) dashboard on http://localhost:5984/_utils/

* **Install package dependencies for the server**

```
$ npm install
``` 

* **Create environment variables file**

A file named **.env** is required before running the server.

Sample .env file:

```
NODE_ENV=development
SERVER_URL=http://localhost:3000/
SERVER_PORT=3000
COUCHDB_URL=http://user:password@localhost:5984
COUCHDB_NAME=keg_db
```

The .env file should be placed under Keg's top directory.

### Front-End

```
$ cd views
``` 

* **Install package dependencies for the front-end**

```
$ bower install
$ npm install
```

* **Build the front-end views**

``` 
$ grunt
``` 

## **Run Keg**

```
$ node app.js
``` 

**Keg is now running on http://localhost:3000**


## Attributions

*The keg and beer icons are freely available [here](http://freedesignfile.com/156946-flat-style-beer-icons-with-ribbon-vector/), under the [Creative Commons (Attribution 3.0)](https://creativecommons.org/licenses/by/3.0/) license.*
