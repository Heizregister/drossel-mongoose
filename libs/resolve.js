var response = require('./response')
var status = require('./status');

module.exports = function Resolve() {
  return Promise.resolve(response(status.CONTINUE));
};
