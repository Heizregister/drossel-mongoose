var response = require('./response')
var status = require('./status');

module.exports = function Resolve(data) {
  if (!data) {
    return Promise.resolve(response(status.CONTINUE));
  }
  if (data === {} || data === [] || data === '{}' || data === '[]') {
    return Promise.resolve(response(status.SUCCESS_NO_CONTENT, data));
  }
  return Promise.resolve(response(status.SUCCESS, data));
};
