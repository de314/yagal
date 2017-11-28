import 'babel-polyfill'
import _ from 'lodash'
import { expect } from 'chai'
import Random from '../../lib/Random'
import SELECT from '../../lib/select'

const TournamentN = SELECT.TournamentN

const wrapGene = (gene, fitness) => ({
  gene,
  fitness,
})

describe('SELECT.TournamentN', function() {
  describe('Tournament2', function() {
    const t2 = TournamentN(2)
    it('should return in population of 1', function() {
      const gene = wrapGene('10011', 4)
      const pop = [gene]
      const r = new Random(0)
      expect(t2(pop, r)).to.equal(gene)
    })
    it('should return winner of tournament', function() {
      const pop = _.range(10).map(i => wrapGene(i, i))
      const expected = pop[8]
      const r = new Random(1)
      expect(t2(pop, r)).to.equal(expected)
    })
    it('should return first in tie', function() {
      const pop = _.range(10).map(i => wrapGene(i, 0))
      const expected = pop[4]
      const r = new Random(1)
      expect(t2(pop, r)).to.equal(expected)
    })
    it('should return larger negative fitness', function() {
      const pop = _.range(10).map(i => wrapGene(i, -i))
      const expected = pop[4]
      const r = new Random(1)
      expect(t2(pop, r)).to.equal(expected)
    })
  })
  describe('Tournament3', function() {
    const t3 = TournamentN(3)
    it('should return in population of 1', function() {
      const gene = wrapGene('10011', 4)
      const pop = [gene]
      const r = new Random(0)
      expect(t3(pop, r)).to.equal(gene)
    })
    it('should return winner of tournament', function() {
      const pop = _.range(10).map(i => wrapGene(i, i))
      const expected = pop[8]
      const r = new Random(1)
      expect(t3(pop, r)).to.equal(expected)
    })
    it('should return first in tie', function() {
      const pop = _.range(10).map(i => wrapGene(i, 0))
      const expected = pop[2]
      const r = new Random(5)
      expect(t3(pop, r)).to.equal(expected)
    })
    it('should return larger negative fitness', function() {
      const pop = _.range(10).map(i => wrapGene(i, -i))
      const expected = pop[0]
      const r = new Random(5)
      expect(t3(pop, r)).to.equal(expected)
    })
  })
})
