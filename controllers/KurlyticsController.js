var TrackingUtils = require('../utils/TrackingUtils'),
    Couch         = require('../interfaces/CouchInterface.js'),
    Utils         = require('../utils/Utils.js');

var KurlyticsController = {

    recordHit: function (req, res) {
        var id = Utils.createMetricsId(req.hash);

        Couch.retrieveDocument(id, function (err, doc) {

            if (err) {
                console.log(err);
            }

            var visitor_agent = TrackingUtils.getUserAgent(req);

            doc.visitor_agents.push({
                visited_at: Date.now(),
                agent: visitor_agent
            });

            doc.clicks = doc.clicks + 1;

            Couch.updateDocument(doc, function (err, doc) {
                if (err) {
                    console.log(err);
                }
            })
        });
    },

    recordCreation: function (req, res) {
        var doc_id = Utils.createMetricsId(req.hash);

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

        Couch.insertDocument(doc_id, document, function (err, data) {
            if (err) {
                console.log(err)
            }
        });
    }

};

module.exports = KurlyticsController;