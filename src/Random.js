import _ from 'lodash'
import MersenneTwister from 'mersenne-twister'

const BIT_MASK_32 = ~(1 << 32)

export function Random(seed) {
  this.seed = seed
  this.generator = new MersenneTwister(seed)
}

Random.prototype.rand = function(arg1, arg2) {
  const min = _.isNil(arg1) || _.isNil(arg2) ? 0 : arg1
  const max = _.isNil(arg1) ? 1 : _.isNil(arg2) ? arg1 : arg2
  return this.generator.random() * (max - min) + min
}

Random.prototype.randInt = function(arg1, arg2) {
  return this.randLong(arg1, arg2) & BIT_MASK_32
}

Random.prototype.randLong = function(arg1, arg2) {
  const min = _.isNil(arg1) ? Number.MIN_SAFE_INTEGER : _.isNil(arg2) ? 0 : arg1
  const max = _.isNil(arg1) ? Number.MAX_SAFE_INTEGER : _.isNil(arg2) ? arg1 : arg2
  return Math.floor(this.rand() * (max - min)) + min
}

export default Random
