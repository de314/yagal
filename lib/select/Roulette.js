'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Roulette = function Roulette(population, r) {
  var totalFitness = _lodash2.default.sumBy(population, 'fitness');
  var sum = 0;
  var rFit = r.randInt(totalFitness);
  for (var j = 0; j < population.length; j++) {
    sum += population[j].fitness;
    if (sum > rFit) {
      return population[j];
    }
  }
  return _lodash2.default.last(population);
};

exports.default = Roulette;