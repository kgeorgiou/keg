var shortid = require('shortid'),
    couchdb = require('../interfaces/CouchInterface.js'),
    config  = require('../config'),
    Utils   = require('../utils/Utils.js');

var KurlController = {

    shorten: function (req, res, next) {
        var longUrl = req.body.long_url;
        var lifeSpan = req.body.life_span;
        var expiryTimestamp = req.body.expires_at;

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

        var document = {
            doc_type: 'short_to_long',
            long_url: longUrl
        };

        if (lifeSpan !== undefined && lifeSpan !== null) {

            req.life_span = lifeSpan;

            if (expiryTimestamp !== undefined && expiryTimestamp !== null) {
                document['expires_at'] = expiryTimestamp;
            } else {
                document['expires_at'] = Date.now + lifeSpan;
            }
        }

        couchdb.insertDocument(hash, document, function (err, data) {

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
            if (err || !data) {
                res.send(req.url + ' not found.');
                return;
            }

            if (data.expires_at) {
                var expTime = new Date(data.expires_at);
                var now = new Date();

                if (expTime < now) {
                    res.send(req.url + ' has expired.');
                    return;
                }
            }

            req.hash = hash;
            next();

            res.redirect(data.long_url);
        });
    }
};

module.exports = KurlController;