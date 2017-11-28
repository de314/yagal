import 'babel-polyfill'
import _ from 'lodash'
import { expect } from 'chai'
import Random from '../../lib/Random'
import SELECT from '../../lib/select'

const Uniform = SELECT.Uniform

describe('SELECT.Uniform', function() {
  it('should return in population of 1', function() {
    const gene = '10011'
    const pop = [gene]
    const r = new Random(0)
    expect(Uniform(pop, r)).to.equal(gene)
  })
  it('should return in large population', function() {
    const gene = '10011'
    const pop = [0, 1, 2, 3, gene, 5, 6, 7]
    const r = new Random(0)
    expect(Uniform(pop, r)).to.equal(gene)
  })
  it('should return uniform random values in large population', function() {
    const pop = _.range(100)
    const r = new Random(0)
    expect(Uniform(pop, r)).to.equal(54)
    expect(Uniform(pop, r)).to.equal(58)
    expect(Uniform(pop, r)).to.equal(70)
    expect(Uniform(pop, r)).to.equal(84)
    expect(Uniform(pop, r)).to.equal(60)
    expect(Uniform(pop, r)).to.equal(84)
  })
})
