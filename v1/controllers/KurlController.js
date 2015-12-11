var shortid = require('shortid'),
    couchdb = require('../interfaces/CouchInterface.js'),
    config  = require('../../config');

var KurlController = {

    shorten: function (req, res, next) {

        var longUrl = req.body.long_url;

        if (!longUrl || !longUrl.length) {
            res.json({
                status: 'error',
                error: 'Parameter [long_url] is missing.',
                short_url: ''
            });
            return;
        }

        /* There are more efficient and smarter ways to produce short and unique hashes
        for the long urls but for now we'll be using the shortid package */
        var hash = shortid.generate();

        couchdb.insertDocument(hash, {
            doc_type: 'short_to_long',
            long_url: longUrl
        }, function (err, data) {

            if (err) {
                res.json({
                    status: 'err',
                    error: err
                });
                return;
            }

            req.hash = hash;
            next();

            var shortUrl = config.server.url + hash;
            res.json({
                status: 'ok',
                short_url: shortUrl,
                long_url: longUrl
            })
        });

    },

    lookup: function (req, res) {
        var hash = req.params.hash;

        couchdb.retrieveDocument(hash, function (err, data) {
            if (err) {
                res.json({
                    status: 'error',
                    error: err
                });
                return;
            }

            res.json({
                status: 'ok',
                short_url: hash,
                long_url: data.long_url
            })
        });
    },

    expand: function (req, res, next) {
        var hash = req.params.hash;

        couchdb.retrieveDocument(hash, function (err, data) {
            if (err) {
                res.json({
                    status: 'error',
                    error: err
                });
                return;
            }

            req.hash = hash;
            next();

            res.redirect(data.long_url);
        });
    }
};

module.exports = KurlController;