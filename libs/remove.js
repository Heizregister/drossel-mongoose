var response = require('./response');
var status = require('./status');

function remove(model, conditions) {
  return new Promise(function(resolve, reject) {
    model.remove(conditions, function(err) {
      if (err) {
        reject(response(status.FAILURE_INTERNAL));
      }
      resolve(response(status.SUCCESS));
    });
  });
}

module.exports = remove;
