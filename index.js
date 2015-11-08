var create = require('./libs/create');
var find = require('./libs/find');
var findById = require('./libs/findById');
var update = require('./libs/update');
var remove = require('./libs/remove');

function Drossel(model) {
  this.model = model;
}

Drossel.prototype.response = function(res, drosselPromise) {
  drosselPromise.then(function(result) {
    res.status(200);
    res.json(result);
  }).catch(function(error) {
    res.status(error.status.code);
    res.json(error);
  });
};

Drossel.prototype.create = function(obj) {
  return create(this.model, obj);
};

Drossel.prototype.find = function(conditions) {
  return find(this.model, conditions);
};

Drossel.prototype.findById = function(id) {
  return findById(this.model, id);
};

Drossel.prototype.update = function(id, obj) {
  return Promise.resolve().then(function() {
    return findById(this.model, id);
  }).then(function(result) {
    return update(this.model, id, obj);
  }).then(function(result) {
    return findById(this.model, id);
  });
};

Drossel.prototype.remove = function(id) {
  return remove(this.model, id);
};

module.exports = Drossel;
