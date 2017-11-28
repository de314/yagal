import 'babel-polyfill'
import _ from 'lodash'
import { expect } from 'chai'
import Random from '../../lib/Random'
import SELECT from '../../lib/select'

const Roulette = SELECT.Roulette

const wrapGene = (gene, fitness = 0) => ({
  gene,
  fitness,
})

describe('SELECT.Roulette', function() {
  it('should return in population of 1', function() {
    const gene = wrapGene('10011')
    const pop = [gene]
    const r = new Random(0)
    expect(Roulette(pop, r)).to.equal(gene)
  })
  it('should return in large population', function() {
    const pop = _.range(10).map(wrapGene)
    const r = new Random(6)
    const expected1 = pop[3]
    const expected2 = pop[2]
    pop.reverse()
    expect(Roulette(pop, r)).to.equal(expected1)
    expect(Roulette(pop, r)).to.equal(expected2)
  })
})
