var express             = require('express'),
    router              = express.Router(),
    KurlController      = require('./v1/controllers/KurlController'),
    KurlyticsController = require('./v1/controllers/KurlyticsController');

router.post('/v1/kurl', KurlController.shorten, KurlyticsController.recordCreation);
router.post('/v1/:hash', KurlController.lookup);
router.get('/:hash', KurlController.expand, KurlyticsController.recordHit);

module.exports = router;