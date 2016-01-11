function response(status, data) {
  if (status !== 200) {
    return Promise.reject({
      status: status,
      data: data ? data : null
    });
  }
  return Promise.resolve({
    status: status,
    data: data ? data : null
  });
}

module.exports = response;
