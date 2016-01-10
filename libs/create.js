var response = require('./response');
var status = require('./status');

function create(model, conditions) {
  return model.create(conditions, function(err, result) {
    if (err && err.name == 'ValidationError') {
      return Promise.reject(response(status.FAILURE_BAD_REQUEST));
    }
    if (err && err.name == 'CastError') {
      return Promise.reject(response(status.FAILURE_BAD_REQUEST));
    }
    if (err) {
      return Promise.reject(response(status.FAILURE_INTERNAL));
    }
    return Promise.resolve(response(status.SUCCESS, result));
  });
}

module.exports = create;
