var config  = require('../config'),
    db_name = config.couchdb.db_name,
    nano    = require('nano')(config.couchdb.server_url);

/* If database already exists, an error will be returned by CouchDB
 but we can still use that database. */
nano.db.create(db_name);
var kurl_db = nano.db.use(db_name);

var CouchInterface = {
    insertDocument: function (id, doc, callback) {
        kurl_db.insert(doc, id, function (err, body) {
            callback(err, body)
        });
    },
    updateDocument: function (doc, callback) {
        kurl_db.insert(doc, function (err, body) {
            callback(err, body)
        });
    },
    retrieveDocument: function (id, callback) {
        kurl_db.get(id, {}, function (err, body) {
            callback(err, body)
        });
    }
};

module.exports = CouchInterface;
