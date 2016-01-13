var response = require('./response')
var status = require('./status');

function findOne(model, conditions) {
  return new Promise(function(resolve, reject) {
    model.findOne(conditions, function(err, result) {
      if (err && err.name == 'ValidationError') {
        reject({status: status.FAILURE_BAD_REQUEST});
      }
      if (err && err.name == 'CastError') {
        reject({status: status.FAILURE_BAD_REQUEST});
      }
      if (err) {
        reject({status: status.FAILURE_INTERNAL});
      }
      if (!result) {
        reject({status: status.FAILURE_NOT_FOUND});
      }
      resolve({status: status.SUCCESS, data: result});
    });
  });
}

module.exports = findOne;
