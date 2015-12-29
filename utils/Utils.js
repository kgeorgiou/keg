var RegExps = require('./RegExps.js');

var Utils = {
    prependScheme: function (url) {
        if (!RegExps.hasScheme.test(url)) {
            /* If no scheme is present, let the browser resolve it to http(s) */
            url = '//' + url;
        }
        return url;
    },

    encodeToAlphabet: function (alphabet, number) {
        if (!alphabet || !alphabet.length) {
            return null;
        }

        if (number === undefined || number === null || number < 0) {
            return null;
        }

        var len = alphabet.length;

        var res = '';

        do {
            var remainder = number % len;
            number = Math.floor(number / len);
            res = alphabet[remainder] + res;
        } while (number != 0);

        return res;
    },

    isValidUrl: function (url) {
        return RegExps.validURL.test(url);
    }
};

module.exports = Utils;


