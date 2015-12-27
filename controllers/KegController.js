var couchdb = require('../interfaces/CouchInterface.js'),
    config  = require('../config.js'),
    Utils   = require('../utils/Utils.js');

var KegController = {

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

        var document = {
            doc_type: 'long_url',
            long_url: longUrl
        };

        if (lifeSpan !== undefined && lifeSpan !== null) {

            req.life_span = lifeSpan;

            /* If expiry timestamp is missing, derive it from the lifespan */
            if (expiryTimestamp !== undefined && expiryTimestamp !== null) {
                document['expires_at'] = expiryTimestamp;
            } else {
                document['expires_at'] = Date.now + lifeSpan;
            }
        }

        couchdb.generateShortId(function (pint) {
            couchdb.insertDocument(pint, document, function (err, data) {

                if (err) {
                    res.json({
                        status: 'error',
                        error: err
                    });
                    return;
                }

                req.pint = pint;
                next();

                var shortUrl = config.server.url + pint;
                res.json({
                    status: 'ok',
                    short_url: shortUrl,
                    long_url: longUrl
                })
            });
        });

    },

    lookup: function (req, res) {
        var pint = req.params.pint;

        couchdb.retrieveDocument(pint, function (err, data) {
            if (err) {
                res.json({
                    status: 'error',
                    error: err
                });
                return;
            }

            res.json({
                status: 'ok',
                short_url: pint,
                long_url: data.long_url
            })
        });
    },

    expand: function (req, res, next) {
        var pint = req.params.pint;

        if (!pint || pint.length == 0) {
            return;
        }

        couchdb.retrieveDocument(pint, function (err, data) {
            if (err || !data || !data.long_url) {
                res.send(req.url + ' not found.');
                return;
            }

            var redirectStatus = 301;

            if (data.expires_at) {
                redirectStatus = 302;

                var expTime = new Date(data.expires_at);
                var now = new Date();

                if (expTime < now) {
                    res.send(req.url + ' has expired.');
                    return;
                }
            }

            req.pint = pint;
            next();

            var longUrl = data.long_url;
            longUrl = Utils.prependScheme(longUrl);

            res.redirect(redirectStatus, longUrl);
        });
    }
};

module.exports = KegController;