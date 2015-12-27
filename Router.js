var express             = require('express'),
    router              = express.Router(),
    KegController       = require('./controllers/KegController'),
    KeglyticsController = require('./controllers/KeglyticsController');

/* Gets a long url and returns a short url that maps to it */
router.post('/keg', KegController.shorten, KeglyticsController.recordCreation);

/* Gets a short url from our domain and redirects it to the original long url */
router.get('/:pint', KegController.expand, KeglyticsController.recordHit);

/* Gets a short url and returns an object that contains the long url that it maps to */
router.post('/:pint', KegController.lookup);

module.exports = router;