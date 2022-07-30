const CentraRequest = require('./centra/CentraRequest');

module.exports = (url, method) => new CentraRequest(url, method);