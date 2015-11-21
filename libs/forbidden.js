var response = require('./response')
var status = require('./status');

module.exports = function Forbidden() {
  return Promise.reject(response(status.FAILURE_FORBIDDEN));
};
