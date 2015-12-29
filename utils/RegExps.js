var RegExps = {
    /* RegExp from https://gist.github.com/dperini/729294
     * Modified to:
     * 1. Allow scheme-less URLs (e.g. kg.gg) - which will be handled
     * as http:// URLs by default.
     * 2. Support some other popular schemes (tftp, mailto, ws, data.).
     * 3. Accept URLs pointing to localhost and 127.0.0.1 */
    validURL: new RegExp(
        "^" +
            // protocol identifier
        "(?:(?:https?|t?ftps?|mailto|data|wss?)://)?" +
            // user:pass authentication
        "(?:\\S+(?::\\S*)?@)?" +
        "(?:" +
            // IP address dotted notation octets
            // excludes loopback network 0.0.0.0
            // excludes reserved space >= 224.0.0.0
            // excludes network & broadcast addresses
            // (first & last IP address of each class)
        "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
        "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
        "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
        "|" +
            // host name
        "localhost" +
        "|" +
        "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
            // domain name
        "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
            // TLD identifier
        "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
            // TLD may end with dot
        "\\.?" +
        ")" +
            // port number
        "(?::\\d{2,5})?" +
            // resource path
        "(?:[/?#]\\S*)?" +
        "$", "i"
    ),
    /* Checks if expanded URL begins with a (common) scheme */
    hasScheme: new RegExp(/^((https?|t?ftp|mailto|data|wss?):)?\/\//)
};

module.exports = RegExps;