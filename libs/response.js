var statusCode = require('./status');

function response(status, data) {
  return new Promise(function(resolve, reject) {
    if (status !== statusCode.SUCCESS) {
      reject({
        status: status,
        data: null
      });
      return;
    }
    resolve({
      status: statusCode.SUCCESS,
      data: data ? data : null
    });
  });
}

module.exports = response;
