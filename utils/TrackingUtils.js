var useragent = require('useragent');

var TrackingUtils = {
    getUserAgent: function (req) {
        var agent = useragent.parse(req.headers['user-agent']);

        if (!agent) {
            return null;
        }

        return {
            browser: {
                family: agent.family,
                major: agent.major,
                minor: agent.minor,
                patch: agent.patch
            },
            os: agent.os.toJSON(),
            device: agent.device.toJSON()
        }
    }
};

module.exports = TrackingUtils;