var response = require('./response')
var status = require('./status');

module.exports = function Resolve(data) {
  if (!data) {
    return Promise.resolve(response(status.CONTINUE));
  }
  if (data.length === 0) {
    return Promise.resolve(response(status.SUCCESS_NO_CONTENT, null));
  }
  return Promise.resolve(response(status.SUCCESS, data));
};
