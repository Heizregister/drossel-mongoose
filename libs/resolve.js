var response = require('./response')
var status = require('./status');

module.exports = function Resolve(data) {
  return Promise.resolve(response(status.CONTINUE, data));
};
