var response = require('./response');
var status = require('./status');

function create(model, conditions) {
  return model.create(conditions, function(err, result) {
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

module.exports = create;
