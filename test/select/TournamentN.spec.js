import 'babel-polyfill'
import _ from 'lodash'
import { expect } from 'chai'
import Random from '../../lib/Random'
import SELECT from '../../lib/select'

const { TournamentN, Tournament2, Tournament3 } = SELECT

const wrapGene = (gene, fitness) => ({
  gene,
  fitness,
})

const CustomSelector = expected => (p, r) => expected

describe('SELECT.TournamentN', function() {
  describe('Selectors', function() {
    it('should use custom selector', function() {
      const gene = wrapGene('10011', 4)
      const pop = [null, null]
      const r = new Random(0)
      const t = TournamentN(2, CustomSelector(gene))
      expect(t(pop, r)).to.equal(gene)
    })
  })
  describe('Tournament2', function() {
    it('should return in population of 1', function() {
      const gene = wrapGene('10011', 4)
      const pop = [gene]
      const r = new Random(0)
      expect(Tournament2(pop, r)).to.equal(gene)
    })
    it('should return winner of tournament', function() {
      const pop = _.range(10).map(i => wrapGene(i, i))
      const expected = pop[8]
      const r = new Random(1)
      expect(Tournament2(pop, r)).to.equal(expected)
    })
    it('should return first in tie', function() {
      const pop = _.range(10).map(i => wrapGene(i, 0))
      const expected = pop[4]
      const r = new Random(1)
      expect(Tournament2(pop, r)).to.equal(expected)
    })
    it('should return larger negative fitness', function() {
      const pop = _.range(10).map(i => wrapGene(i, -i))
      const expected = pop[4]
      const r = new Random(1)
      expect(Tournament2(pop, r)).to.equal(expected)
    })
  })
  describe('Tournament3', function() {
    it('should return in population of 1', function() {
      const gene = wrapGene('10011', 4)
      const pop = [gene]
      const r = new Random(0)
      expect(Tournament3(pop, r)).to.equal(gene)
    })
    it('should return winner of tournament', function() {
      const pop = _.range(10).map(i => wrapGene(i, i))
      const expected = pop[8]
      const r = new Random(1)
      expect(Tournament3(pop, r)).to.equal(expected)
    })
    it('should return first in tie', function() {
      const pop = _.range(10).map(i => wrapGene(i, 0))
      const expected = pop[2]
      const r = new Random(5)
      expect(Tournament3(pop, r)).to.equal(expected)
    })
    it('should return larger negative fitness', function() {
      const pop = _.range(10).map(i => wrapGene(i, -i))
      const expected = pop[0]
      const r = new Random(5)
      expect(Tournament3(pop, r)).to.equal(expected)
    })
  })
  describe('TournamentN (big -> 5)', function() {
    const t5 = TournamentN(5)
    it('should return in population of 1', function() {
      const gene = wrapGene('10011', 4)
      const pop = [gene]
      const r = new Random(0)
      expect(t5(pop, r)).to.equal(gene)
    })
    it('should return winner of tournament', function() {
      const pop = _.range(100).map(i => wrapGene(i, i))
      const expected = pop[98]
      const r = new Random(1)
      expect(t5(pop, r)).to.equal(expected)
    })
    it('should return first in tie', function() {
      const pop = _.range(100).map(i => wrapGene(i, 0))
      const expected = pop[22]
      const r = new Random(5)
      expect(t5(pop, r)).to.equal(expected)
    })
    it('should return larger negative fitness', function() {
      const pop = _.range(100).map(i => wrapGene(i, -i))
      const expected = pop[4]
      const r = new Random(5)
      expect(t5(pop, r)).to.equal(expected)
    })
  })
})
