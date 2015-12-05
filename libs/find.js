var response = require('./response')
var status = require('./status');

module.exports = function Find(model, conditions) {
  return new Promise(function(resolve, reject) {
    model.find(conditions, function(err, result) {
      if (err && err.name == 'ValidationError') {
        reject(response(status.FAILURE_BAD_REQUEST));
        return;
      }
      if (err && err.name == 'CastError') {
        reject(response(status.FAILURE_BAD_REQUEST));
        return;
      }
      if (err) {
        reject(response(status.FAILURE_INTERNAL));
        return;
      }
      if (!result.length) {
        resolve(response(status.SUCCESS_NO_CONTENT, result));
        return;
      }
      resolve(response(status.SUCCESS, result));
    });
  });
};
