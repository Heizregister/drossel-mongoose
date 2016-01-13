var response = require('./response');
var status = require('./status');

function create(model, conditions) {
  return new Promise(function(resolve, reject) {
    model.create(conditions, function(err, result) {
      if (err && err.name == 'ValidationError') {
        reject({status: status.FAILURE_BAD_REQUEST});
      }
      if (err && err.name == 'CastError') {
        reject({status: status.FAILURE_BAD_REQUEST});
      }
      if (err) {
        reject({status: status.FAILURE_INTERNAL});
      }
      resolve({status: status.SUCCESS, data: result});
    });
  });
}

module.exports = create;
