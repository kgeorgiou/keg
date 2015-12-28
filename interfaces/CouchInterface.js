var config  = require('../config'),
    db_name = config.couchdb.db_name,
    nano    = require('nano')(config.couchdb.server_url),
    Utils   = require('../utils/Utils.js');

/* If database already exists, an error will be returned by CouchDB
 but we can still use that database. */
nano.db.create(db_name);
var keg_db = nano.db.use(db_name);

/* Keep track of a counter of all the shortened urls in order to know
 how to generate the next short url. Does not get overwritten. */
keg_db.insert({
    doc_type: 'keg_meta',
    count: 0,
    alphabet: 'Q5lP9DO2yAIW1TFbu6gHNVahdREU0Sm7M8cJBpeCZioGLwYnvzf3krK4tsXqxj'
}, 'keg:meta');

var CouchInterface = {
    insertDocument: function (id, doc, callback) {
        keg_db.insert(doc, id, function (err, body) {
            callback(err, body)
        });
    },
    updateDocument: function (doc, callback) {
        keg_db.insert(doc, function (err, body) {
            callback(err, body)
        });
    },
    retrieveDocument: function (id, callback) {
        keg_db.get(id, {}, function (err, body) {
            callback(err, body)
        });
    },
    generateShortId: function (callback) {
        keg_db.get('keg:meta', {}, function (err, doc) {
            if (err) {
                return null;
            }

            var count = doc.count;
            var alphabet = doc.alphabet;

            var shortId = Utils.encodeToAlphabet(alphabet, count);

            /* Update counter in CouchDB */
            doc.count = count + 1;
            keg_db.insert(doc, function (err, body) {
                if (err) {
                    //TODO: Log and handle.
                }

                callback(shortId);
            });
        });
    },
    generateMetricsId: function (str) {
        if (!str || str.length == 0) {
            return null;
        }
        return str + ':metrics'
    }
};

module.exports = CouchInterface;
