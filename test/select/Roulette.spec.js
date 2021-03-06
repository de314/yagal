import 'babel-polyfill'
import _ from 'lodash'
import { expect } from 'chai'
import TestRandom from '../TestRandom'
import SELECT from '../../src/select'

const Roulette = SELECT.Roulette

const wrapGene = (gene, fitness = 0) => ({
  gene,
  fitness,
})

describe('SELECT.Roulette', function() {
  it('should return in population of 1', function() {
    const gene = wrapGene('10011')
    const pop = { genes: [gene] }
    const r = new TestRandom(0)
    expect(Roulette(pop, r)).to.equal(gene)
  })
  it('should return in large population', function() {
    const pop = { genes: _.range(10).map(i => wrapGene(i, 1)) }
    const r = new TestRandom(3, 7)
    expect(Roulette(pop, r)).to.equal(pop.genes[3])
    expect(Roulette(pop, r)).to.equal(pop.genes[7])
  })
})
