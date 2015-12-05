var response = require('./response')
var status = require('./status');

module.exports = function Remove(model, id) {
  return new Promise(function (resolve, reject) {
    model.remove({_id: id}, function (err) {
      if (err) {
        reject(response(status.FAILURE_INTERNAL));
        return;
      }
      resolve(response(status.SUCCESS, null));
    });
  });
};
