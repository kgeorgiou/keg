var delim = ':';

var Utils = {
    createMetricsId : function(str) {
        if (!str || str.length == 0) {
            return null;
        }

        return str + delim + 'metrics'
    },

    hasExpires : function(timestamp) {
        return false;
    }
};

module.exports = Utils;


