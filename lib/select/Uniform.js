"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Uniform = function Uniform(population, r) {
  return population[r.randInt(population.length)];
};

exports.default = Uniform;