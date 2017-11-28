import _ from 'lodash'

function TestRandom(...expectedOutputs) {
  this.expectedOutputs = expectedOutputs
  this.index = 0
}

TestRandom.prototype._ = function() {
  return this.expectedOutputs[this.index++ % this.expectedOutputs.length]
}

TestRandom.prototype.rand = function() {
  return this._()
}

TestRandom.prototype.randInt = function() {
  return this._()
}

TestRandom.prototype.randLong = function() {
  return this._()
}

export default TestRandom
