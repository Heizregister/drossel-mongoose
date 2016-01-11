var _ = require('lodash');
var create = require('./libs/create');
var find = require('./libs/find');
var findById = require('./libs/find-by-id');
var update = require('./libs/update');
var remove = require('./libs/remove');
var status = require('./libs/status');
var response = require('./libs/response');

var drmg = {};

/**
 * create
 *
 * @param {Object} model mongoose model
 * @param {Object} obj update data
 * @return {Promise.<Object>} drossel-mongoose response
 */
drmg.create = function(model, obj) {
  return create(model, obj);
};

/**
 * find
 *
 * @param {Object} model mongoose model
 * @param {Object} conditions conditions
 * @return {Promise.<Object>} drossel-mongoose response
 */
drmg.find = function(model, conditions) {
  return find(model, conditions);
};

/**
 * findById
 *
 * @param {Object} model mongoose model
 * @param {ObjectId} id mongodb object id
 * @return {Promise.<Object>} drossel-mongoose response
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
 * @return {Promise.<Object>} drossel-mongoose response
 */
drmg.update = function(model, id, obj) {
  return update(model, id, obj);
};

/**
 * remove
 *
 * @param {Object} model mongoose model
 * @param {Object} target conditions
 * @return {Promise.<Object>} drossel-mongoose response
 */
drmg.remove = function(model, conditions) {
  return remove(model, conditions);
};

/**
 * all
 *
 * @param {Array} arr many  drossel-mongoose response
 * @return {Promise.<Object>} drossel-mongoose response
 */
drmg.all = function(arr) {
  return Promise.all(arr).then(function(results) {
    var data = _.map(results, function(item) {
      return item.data;
    });
    return drmg.response(drmg.status.SUCCESS, data);
  });
};

/**
 * expressResponse (Express framework friendly)
 *
 * @param {Object} res Express response object
 * @param {Promise.<Object>} response drossel-mongoose response
 */
drmg.expressResponse = function(res, response) {
  response.then(function(result) {
    res.status(200);
    res.json(result.data);
  }).catch(function(error) {
    res.status(error.status);
    res.json(null);
  });
};

/**
 * response
 *
 * @param {Number} status HTTP status code
 * @param {Object} data JSON result
 * @return {Promise.<Object>} drossel-mongoose response
 */
drmg.response = response;

/**
 * status
 *
 * @return {Object} HTTP status code constants
 */
drmg.status = status;

module.exports = drmg;
