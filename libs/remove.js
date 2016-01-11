var response = require('./response');
var status = require('./status');

function remove(model, conditions) {
  return model.remove(conditions, function(err) {
    if (err) {
      return response(status.FAILURE_INTERNAL);
    }
    return response(status.SUCCESS);
  });
}

module.exports = remove;
