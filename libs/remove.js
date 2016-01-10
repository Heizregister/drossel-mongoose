var response = require('./response');
var status = require('./status');

function remove(model, conditions) {
  model.remove(conditions, function(err) {
    if (err) {
      return Promise.reject(response(status.FAILURE_INTERNAL));
    }
    return Promise.resolve(response(status.SUCCESS));
  });
}

module.exports = remove;
