'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Random = Random;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _mersenneTwister = require('mersenne-twister');

var _mersenneTwister2 = _interopRequireDefault(_mersenneTwister);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BIT_MASK_32 = ~(1 << 32);

function Random(seed) {
  this.seed = seed;
  this.generator = new _mersenneTwister2.default(seed);
}

Random.prototype.rand = function (arg1, arg2) {
  var min = _lodash2.default.isNil(arg1) || _lodash2.default.isNil(arg2) ? 0 : arg1;
  var max = _lodash2.default.isNil(arg1) ? 1 : _lodash2.default.isNil(arg2) ? arg1 : arg2;
  return this.generator.random() * (max - min) + min;
};

Random.prototype.randInt = function (arg1, arg2) {
  return this.randLong(arg1, arg2) & BIT_MASK_32;
};

Random.prototype.randLong = function (arg1, arg2) {
  var min = _lodash2.default.isNil(arg1) ? Number.MIN_SAFE_INTEGER : _lodash2.default.isNil(arg2) ? 0 : arg1;
  var max = _lodash2.default.isNil(arg1) ? Number.MAX_SAFE_INTEGER : _lodash2.default.isNil(arg2) ? arg1 : arg2;
  return Math.floor(this.rand() * (max - min)) + min;
};

exports.default = Random;