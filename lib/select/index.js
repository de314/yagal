'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Fittest = require('./Fittest');

var _Fittest2 = _interopRequireDefault(_Fittest);

var _TournamentN = require('./TournamentN');

var _TournamentN2 = _interopRequireDefault(_TournamentN);

var _Uniform = require('./Uniform');

var _Uniform2 = _interopRequireDefault(_Uniform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Fittest: _Fittest2.default,
  TournamentN: _TournamentN2.default,
  Tournament2: (0, _TournamentN2.default)(2),
  Tournament3: (0, _TournamentN2.default)(3),
  Uniform: _Uniform2.default
};