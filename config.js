
var config = {
    server: {
        url: process.env.SERVER_URL || 'http://localhost:3000/',
        port: process.env.SERVER_PORT || 3000
    },
    couchdb: {
        server_url: process.env.COUCHDB_URL || 'http://localhost:5984',
        db_name: process.env.COUCHDB_NAME || 'test_db'
    }
};

module.exports = config;