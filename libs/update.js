var response = require('./response')
var status = require('./status');

module.exports = function Update(model, id, obj) {
  return new Promise(function(resolve, reject) {
    model.update({_id: id}, obj, {runValidators: true}, function (err, result) {
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
