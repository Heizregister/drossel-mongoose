var response = require('./response')
var status = require('./status');

function findOne(model, conditions) {
  return new Promise(function(resolve, reject) {
    model.findOne(conditions, function(err, result) {
      if (err && err.name == 'ValidationError') {
        reject(response(status.FAILURE_BAD_REQUEST));
      }
      if (err && err.name == 'CastError') {
        reject(response(status.FAILURE_BAD_REQUEST));
      }
      if (err) {
        reject(response(status.FAILURE_INTERNAL));
      }
      if (!result) {
        reject(response(status.FAILURE_NOT_FOUND));
      }
      resolve(response(status.SUCCESS, result));
    });
  });
}

module.exports = findOne;
