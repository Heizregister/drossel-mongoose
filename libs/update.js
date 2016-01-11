var response = require('./response');
var status = require('./status');

function update(model, id, conditions) {
  return new Promise(function(resolve, reject) {
    model.update({_id: id}, conditions, {runValidators: true}, function(err, result) {
      if (err && err.name == 'ValidationError') {
        reject(response(status.FAILURE_BAD_REQUEST));
      }
      if (err && err.name == 'CastError') {
        reject(response(status.FAILURE_BAD_REQUEST));
      }
      if (err) {
        reject(response(status.FAILURE_INTERNAL));
      }
      // fetch updated result
      model.findById(id, function(err, result) {
        if (err) {
          reject(response(status.FAILURE_INTERNAL));
        }
        resolve(response(status.SUCCESS, result));
      });
    });
  });
}

module.exports = update;
