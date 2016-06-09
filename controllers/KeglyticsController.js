var TrackingUtils = require('../utils/TrackingUtils'),
    couchdb       = require('../interfaces/CouchInterface.js');

var KeglyticsController = {

    recordHit: function (req, res) {
        var id = couchdb.generateMetricsId(req.pint);

        couchdb.retrieveDocument(id, function (err, doc) {

            if (err) {
                // TODO: Handle error
                return;
            }

            var visitor_agent = TrackingUtils.getUserAgent(req);

            doc.visitor_agents.push({
                visited_at: Date.now(),
                agent: visitor_agent
            });

            doc.clicks = doc.clicks + 1;

            couchdb.updateDocument(doc, function (err, doc) {
                if (err) {
                    // TODO: Handle error
                }
            })
        });
    },

    recordCreation: function (req, res) {
        var doc_id = couchdb.generateMetricsId(req.pint);

        if (!doc_id || doc_id.length == 0) {
            // TODO: Log error.
            return;
        }

        var lifeSpan = req.life_span;

        var creator_agent = TrackingUtils.getUserAgent(req);

        var document = {
            doc_type: 'metrics',
            created_at: Date.now(),
            creator_agent: creator_agent,
            clicks: 0,
            visitor_agents: []
        };

        if (lifeSpan !== undefined && lifeSpan !== null) {
            document['life_span'] = lifeSpan;
        }

        couchdb.insertDocument(doc_id, document, function (err, data) {
            if (err) {
                // TODO: Handle error
            }
        });
    }

};

module.exports = KeglyticsController;