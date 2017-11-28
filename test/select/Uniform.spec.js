import 'babel-polyfill'
import _ from 'lodash'
import { expect } from 'chai'
import TestRandom from '../TestRandom'
import SELECT from '../../lib/select'

const Uniform = SELECT.Uniform

describe('SELECT.Uniform', function() {
  it('should return in population of 1', function() {
    const gene = '10011'
    const pop = { genes: [gene] }
    const r = new TestRandom(0)
    expect(Uniform(pop, r)).to.equal(gene)
  })
  it('should return in large population', function() {
    const gene = '10011'
    const pop = { genes: [0, 1, 2, 3, gene, 5, 6, 7] }
    const r = new TestRandom(4)
    expect(Uniform(pop, r)).to.equal(gene)
  })
  it('should return uniform random values in large population', function() {
    const pop = { genes: _.range(100) }
    const r = new TestRandom(54, 58, 3, 98)
    expect(Uniform(pop, r)).to.equal(54)
    expect(Uniform(pop, r)).to.equal(58)
    expect(Uniform(pop, r)).to.equal(3)
    expect(Uniform(pop, r)).to.equal(98)
  })
})
