function response(status, data) {
  return Promise.resolve({
    status: status,
    data: data ? data : null
  });
}

module.exports = response;
