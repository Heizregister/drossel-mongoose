var response = require('./response')
var status = require('./status');

function findById(model, id) {
  model.findById(id, function(err, result) {
    if (err && err.name == 'ValidationError') {
      return Promise.reject(response(status.FAILURE_BAD_REQUEST));
    }
    if (err && err.name == 'CastError') {
      return Promise.reject(response(status.FAILURE_BAD_REQUEST));
    }
    if (err) {
      return Promise.reject(response(status.FAILURE_INTERNAL));
    }
    if (!result) {
      return Promise.reject(response(status.FAILURE_NOT_FOUND));
    }
    return Promise.resolve(response(status.SUCCESS, result));
  });
}

module.exports = findById;
