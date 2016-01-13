var response = require('./response');
var status = require('./status');

function update(model, id, conditions) {
  return new Promise(function(resolve, reject) {
    model.update({_id: id}, conditions, {runValidators: true}, function(err, result) {
      if (err && err.name == 'ValidationError') {
        reject({status: status.FAILURE_BAD_REQUEST});
      }
      if (err && err.name == 'CastError') {
        reject({status: status.FAILURE_BAD_REQUEST});
      }
      if (err) {
        reject({status: status.FAILURE_INTERNAL});
      }
      // fetch updated result
      model.findById(id, function(err, result) {
        if (err) {
          reject({status: status.FAILURE_INTERNAL});
        }
        resolve({status: status.SUCCESS, data: result});
      });
    });
  });
}

module.exports = update;
