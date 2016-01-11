var response = require('./response')
var status = require('./status');

function findById(model, id) {
  return model.findById(id, function(err, result) {
    if (err && err.name == 'ValidationError') {
      return response(status.FAILURE_BAD_REQUEST);
    }
    if (err && err.name == 'CastError') {
      return response(status.FAILURE_BAD_REQUEST);
    }
    if (err) {
      return response(status.FAILURE_INTERNAL);
    }
    if (!result) {
      return response(status.FAILURE_NOT_FOUND);
    }
    return response(status.SUCCESS, result);
  });
}

module.exports = findById;
