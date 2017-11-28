"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Identity = function Identity(parents, r) {
  return parents.map(function (p) {
    return p.gene;
  });
};

exports.default = Identity;