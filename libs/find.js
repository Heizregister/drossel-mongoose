var response = require('./response')
var status = require('./status');

module.exports = function Find(model, conditions) {
  return new Promise(function(resolve, reject) {
    model.find(conditions, function(err, result) {
      if (err && err.name == 'ValidationError') {
        reject(response(status.FAILURE_VALIDATION));
        return;
      }
      if (err && err.name == 'CastError') {
        reject(response(status.FAILURE_CAST));
        return;
      }
      if (err) {
        reject(response(status.FAILURE));
        return;
      }
      if (!result.length) {
        resolve(response(status.SUCCESS_NO_CONTENT, result));
        return;
      }
      resolve(response(status.SUCCESS, result));
    });
  });
}
