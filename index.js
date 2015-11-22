var create = require('./libs/create');
var find = require('./libs/find');
var findOne = require('./libs/find-one');
var findById = require('./libs/find-by-id');
var update = require('./libs/update');
var remove = require('./libs/remove');
var resolve = require('./libs/resolve');
var forbidden = require('./libs/forbidden');
var teapot = require('./libs/teapot');

var drossel = {};

drossel.resolve = function(data) {
  return resolve(data);
};

drossel.response = function(res, drosselPromise) {
  drosselPromise.then(function(result) {
    res.status(200);
    res.json(result);
  }).catch(function(error) {
    res.status(error.status.code);
    res.json(error);
  });
};

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

drossel.forbidden = function() {
  return forbidden();
};

drossel.teapot = function() {
  return teapot();
};

module.exports = drossel;
