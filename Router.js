var express             = require('express'),
    router              = express.Router(),
    KurlController      = require('./controllers/KurlController'),
    KurlyticsController = require('./controllers/KurlyticsController');

/* Gets a long url and returns a short url that maps to it */
router.post('/kurl', KurlController.shorten, KurlyticsController.recordCreation);

/* Gets a short url from our domain and redirects it to the original long url */
router.get('/:hash', KurlController.expand, KurlyticsController.recordHit);

/* Gets a short url and returns an object that contains the long url that it maps to */
router.post('/:hash', KurlController.lookup);

module.exports = router;