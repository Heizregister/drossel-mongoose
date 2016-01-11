var response = require('./response');
var status = require('./status');

function update(model, id, conditions) {
  return model.update({_id: id}, conditions, {runValidators: true}, function(err, result) {
    if (err && err.name == 'ValidationError') {
      return response(status.FAILURE_BAD_REQUEST);
    }
    if (err && err.name == 'CastError') {
      return response(status.FAILURE_BAD_REQUEST);
    }
    if (err) {
      return response(status.FAILURE_INTERNAL);
    }
    // fetch updated result
    return model.findById(id, function(err, result) {
      if (err) {
        return response(status.FAILURE_INTERNAL);
      }
      return response(status.SUCCESS, result);
    });
  });
}

module.exports = update;
