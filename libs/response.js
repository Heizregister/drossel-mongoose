module.exports = function Response(status, data) {
  return {
    status: status,
    data: data
  };
};
