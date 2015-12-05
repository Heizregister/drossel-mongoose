var response = require('./response')
var status = require('./status');

module.exports = function Create(model, obj) {
  return new Promise(function(resolve, reject) {
    model.create(obj, function(err, result) {
      if (err && err.name == 'ValidationError') {
        reject(response(status.FAILURE_VALIDATION));
        return;
      }
      if (err && err.name == 'CastError') {
        reject(response(status.FAILURE_CAST));
        return;
      }
      if (err) {
        reject(response(status.FAILURE));
        return;
      }
      resolve(response(status.SUCCESS, result));
    });
  });
};
