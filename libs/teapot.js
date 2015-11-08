var response = require('./response')
var status = require('./status');

module.exports = function Teapot() {
  return Promise.reject(response(status.FAILURE_TEAPOT));
};
