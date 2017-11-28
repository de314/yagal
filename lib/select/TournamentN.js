'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Uniform = require('./Uniform');

var _Uniform2 = _interopRequireDefault(_Uniform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TournamentN = function TournamentN(count) {
  var subSelector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Uniform2.default;
  return function (population, r) {
    return _lodash2.default.maxBy(_lodash2.default.range(count).map(function () {
      return subSelector(population, r);
    }), 'fitness');
  };
};

exports.default = TournamentN;