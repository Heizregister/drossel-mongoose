var create = require('./libs/create');
var find = require('./libs/find');
var findById = require('./libs/find-by-id');
var update = require('./libs/update');
var remove = require('./libs/remove');
var status = require('./libs/status');

var drmg = {};

/**
 * create
 *
 * @param {Object} model mongoose model
 * @param {Object} obj update data
 * @return {Primises} drosselMongooseResult
 */
drmg.create = function(model, obj) {
  return create(model, obj);
};

/**
 * find
 *
 * @param {Object} model mongoose model
 * @param {Object} target conditions
 * @return {Primises} drosselMongooseResult
 */
drmg.find = function(model, conditions) {
  return find(model, conditions);
};

/**
 * findById
 *
 * @param {Object} model mongoose model
 * @param {ObjectId} id mongodb object id
 * @return {Primises} drosselMongooseResult
 */
drmg.findById = function(model, id) {
  return findById(model, id);
};

/**
 * update
 *
 * @param {Object} model mongoose model
 * @param {ObjectId} id mongodb object id
 * @param {Object} obj update data
 * @return {Primises} drosselMongooseResult
 */
drmg.update = function(model, id, obj) {
  return update(model, id, obj);
};

/**
 * remove
 *
 * @param {Object} model mongoose model
 * @param {Object} target conditions
 * @return {Primises} drosselMongooseResult
 */
drmg.remove = function(model, conditions) {
  return remove(model, conditions);
};

/**
 * response (Express framework friendly)
 *
 * @param {Object} res Express response object
 * @param {Promises|Object} obj drossel-mongoose result (or custom response)
 * @param {Number} drosselMongooseResult.status HTTP status code
 * @param {Object} drosselMongooseResult.data result json
 */
drmg.response = function(res, obj) {
  // custom response
  if (obj.status) {
    res.status(obj.status);
    res.json(obj.data ? obj.data : null);
    return;
  }

  obj.then(function(result) {
    res.status(200);
    res.json(result.data);
  }).catch(function(error) {
    res.status(error.status);
    res.json(null);
  });
  return;
}

/**
 * status
 *
 * @return {Object} HTTP status code constants
 */
drmg.status = status;

module.exports = drmg;
