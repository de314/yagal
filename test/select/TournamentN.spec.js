import 'babel-polyfill'
import _ from 'lodash'
import { expect } from 'chai'
import TestRandom from '../TestRandom'
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
      const r = new TestRandom(-1)
      const t = TournamentN(2, CustomSelector(gene))
      expect(t(pop, r)).to.equal(gene)
    })
  })
  describe('Tournament2', function() {
    it('should return in population of 1', function() {
      const gene = wrapGene('10011', 4)
      const pop = [gene]
      const r = new TestRandom(0)
      expect(Tournament2(pop, r)).to.equal(gene)
    })
    it('should return winner of tournament', function() {
      const pop = _.range(10).map(i => wrapGene(i, i))
      const r = new TestRandom(4, 8)
      expect(Tournament2(pop, r)).to.equal(pop[8])
    })
    it('should return first in tie', function() {
      const pop = _.range(10).map(i => wrapGene(i, 0))
      const r = new TestRandom(4, 8)
      expect(Tournament2(pop, r)).to.equal(pop[4])
    })
    it('should return larger negative fitness', function() {
      const pop = _.range(10).map(i => wrapGene(i, -i))
      const r = new TestRandom(7, 4)
      expect(Tournament2(pop, r)).to.equal(pop[4])
    })
  })
  describe('Tournament3', function() {
    it('should return in population of 1', function() {
      const gene = wrapGene('10011', 4)
      const pop = [gene]
      const r = new TestRandom(0)
      expect(Tournament3(pop, r)).to.equal(gene)
    })
    it('should return winner of tournament', function() {
      const pop = _.range(10).map(i => wrapGene(i, i))
      const r = new TestRandom(4, 8, 7)
      expect(Tournament3(pop, r)).to.equal(pop[8])
    })
    it('should return first in tie', function() {
      const pop = _.range(10).map(i => wrapGene(i, 0))
      const r = new TestRandom(3, 6, 1)
      expect(Tournament3(pop, r)).to.equal(pop[3])
    })
    it('should return larger negative fitness', function() {
      const pop = _.range(10).map(i => wrapGene(i, -i))
      const r = new TestRandom(2, 8, 5)
      expect(Tournament3(pop, r)).to.equal(pop[2])
    })
  })
  describe('TournamentN (big -> 5)', function() {
    const t5 = TournamentN(5)
    it('should return in population of 1', function() {
      const gene = wrapGene('10011', 4)
      const pop = [gene]
      const r = new TestRandom(0)
      expect(t5(pop, r)).to.equal(gene)
    })
    it('should return winner of tournament', function() {
      const pop = _.range(100).map(i => wrapGene(i, i))
      const r = new TestRandom(55, 3, 98, 27, 76)
      expect(t5(pop, r)).to.equal(pop[98])
    })
    it('should return first in tie', function() {
      const pop = _.range(100).map(i => wrapGene(i, 0))
      const r = new TestRandom(22, 16, 91, 61, 43)
      expect(t5(pop, r)).to.equal(pop[22])
    })
    it('should return larger negative fitness', function() {
      const pop = _.range(100).map(i => wrapGene(i, -i))
      const r = new TestRandom(32, 69, 41, 28, 91)
      expect(t5(pop, r)).to.equal(pop[28])
    })
  })
})
