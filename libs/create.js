var response = require('./response');
var status = require('./status');

function create(model, conditions) {
  return new Promise(function(resolve, reject) {
    model.create(conditions, function(err, result) {
      if (err && err.name == 'ValidationError') {
        reject(response(status.FAILURE_BAD_REQUEST));
      }
      if (err && err.name == 'CastError') {
        reject(response(status.FAILURE_BAD_REQUEST));
      }
      if (err) {
        reject(response(status.FAILURE_INTERNAL));
      }
      resolve(response(status.SUCCESS, result));
    });
  });
}

module.exports = create;
