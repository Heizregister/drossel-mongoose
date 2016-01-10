function response(status, data) {
  return {
    status: status,
    data: data ? data : null
  }
}

module.exports = response;
