var response = require('./response')
var status = require('./status');

module.exports = function FindOne(model, conditions) {
  return new Promise(function(resolve, reject) {
    model.findOne(conditions, function(err, result) {
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
      if (!result) {
        reject(response(status.FAILURE_NOT_FOUND));
        return;
      }
      resolve(response(status.SUCCESS, result));
    });
  });
};
