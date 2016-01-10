var response = require('./response');
var status = require('./status');

function update(model, id, conditions) {
  model.update({_id: id}, conditions, {runValidators: true}, function(err, result) {
    if (err && err.name == 'ValidationError') {
      return Promise.reject(response(status.FAILURE_BAD_REQUEST));
    }
    if (err && err.name == 'CastError') {
      return Promise.reject(response(status.FAILURE_BAD_REQUEST));
    }
    if (err) {
      return Promise.reject(response(status.FAILURE_INTERNAL));
    }
    // fetch updated result
    model.findById(id, function(err, result) {
      if (err) {
        return Promise.reject(response(status.FAILURE_INTERNAL));
      }
      return Promise.resolve(response(status.SUCCESS, result));
    });
  });
}

module.exports = update;
