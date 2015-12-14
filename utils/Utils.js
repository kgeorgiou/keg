var delim = ':';

var Utils = {
    createMetricsId : function(str) {
        if (!str || str.length == 0) {
            return null;
        }

        return str + delim + 'metrics'
    }
};

module.exports = Utils;


