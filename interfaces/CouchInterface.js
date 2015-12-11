var config = require('../config'),
    nano = require('nano')(config.couchdb.server_url),
    kurl_db = nano.db.use(config.couchdb.db_name);

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
