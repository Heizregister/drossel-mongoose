var _ = require('lodash');
var create = require('./libs/create');
var find = require('./libs/find');
var findOne = require('./libs/find-one');
var findById = require('./libs/find-by-id');
var update = require('./libs/update');
var remove = require('./libs/remove');
var response = require('./libs/response');
var status = require('./libs/status');

var drossel = {};

//--------------------------------------------------
// database
//--------------------------------------------------
drossel.create = function(model, obj) {
  return create(model, obj);
};

drossel.find = function(model, conditions) {
  return find(model, conditions);
};

drossel.findOne = function(model, conditions) {
  return findOne(model, conditions);
};

drossel.findById = function(model, id) {
  return findById(model, id);
};

drossel.update = function(model, id, obj) {
  return Promise.resolve().then(function() {
    return findById(model, id);
  }).then(function(result) {
    return update(model, id, obj);
  }).then(function(result) {
    return findById(model, id);
  });
};

drossel.remove = function(model, id) {
  return remove(model, id);
};

//--------------------------------------------------
// status
//--------------------------------------------------
// 1xx, 2xx
drossel.resolve = function(data) {
  // 100 continue
  if (data === undefined || data === null) {
    return Promise.resolve(response(status.CONTINUE));
  }
  // 204 no content
  if (data && data.length === 0) {
    return Promise.resolve(response(status.SUCCESS_NO_CONTENT, data));
  }
  // 200 success
  return Promise.resolve(response(status.SUCCESS, data));
};

// 400 bad request
drossel.badRequest = function() {
  return Promise.reject(response(status.FAILURE_BAD_REQUEST));
};

// 401 unauthorized
drossel.unauthorized = function() {
  return Promise.reject(response(status.FAILURE_UNAUTHORIZED));
};

// 403 forbidden
drossel.forbidden = function() {
  return Promise.reject(response(status.FAILURE_FORBIDDEN));
};

// 404 not found
drossel.notFound = function() {
  return Promise.reject(response(status.FAILURE_NOT_FOUND));
};

// 409 conflict
drossel.conflict = function() {
  return Promise.reject(response(status.FAILURE_CONFLICT));
};

// 418 teapot
drossel.teapot = function() {
  return Promise.reject(response(status.FAILURE_TEAPOT));
};

//--------------------------------------------------
// useful
//--------------------------------------------------
// customized Promise.all
drossel.all = function(drosselPromises) {
  return Promise.all(drosselPromises).then(function(results) {
    var data = _.map(results, function(item) {
      return item.data;
    });
    return Promise.resolve(response(status.SUCCESS, data));
  });
}

// Express framework friendly
drossel.response = function(res, drosselPromise) {
  drosselPromise.then(function(result) {
    res.status(200);
    res.json(result);
  }).catch(function(error) {
    res.status(error.status.code);
    res.json(error);
  });
};

module.exports = drossel;
