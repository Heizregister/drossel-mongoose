var response = require('./response')
var status = require('./status');

function find(model, conditions) {
  return model.find(conditions, function(err, result) {
    if (err && err.name == 'ValidationError') {
      return response(status.FAILURE_BAD_REQUEST);
    }
    if (err && err.name == 'CastError') {
      return response(status.FAILURE_BAD_REQUEST);
    }
    if (err) {
      return response(status.FAILURE_INTERNAL);
    }
    return response(status.SUCCESS, result);
  });
}

module.exports = find;
