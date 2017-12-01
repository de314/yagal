import 'babel-polyfill'
import { expect } from 'chai'
import TestRandom from '../TestRandom'
import EVOLVE from '../../src/evolve'

const Uniform = EVOLVE.Uniform

const wrapGene = (gene, fitness = 0) => ({
  gene,
  fitness,
})

describe('EVOLVE.Uniform', function() {
  it('should return with 1 parent', function() {
    const genes = [[1, 2, 3, 4]]
    const parents = genes.map(wrapGene)
    expect(Uniform(parents, null)).to.deep.equal(genes)
  })
  it('should error with non-array genes', function() {
    const genes = [1, 2, 3, 4]
    const parents = genes.map(wrapGene)
    expect(() => Uniform(parents, null)).to.throw()
  })
  it('should evolve with 2 parents', function() {
    const parents = [[1, 2], [3, 4]].map(wrapGene)
    const expected = [[1, 4], [3, 2]]
    const r = new TestRandom(1)
    expect(Uniform(parents, r)).to.deep.equal(expected)
  })
  it('should evolve with 2 parents with long genes', function() {
    const parents = [[1, 2, 3, 4], [-1, -2, -3, -4]].map(wrapGene)
    const expected = [[1, -2, 3, -4], [-1, 2, -3, 4]]
    const r = new TestRandom(2)
    expect(Uniform(parents, r)).to.deep.equal(expected)
  })
  it('should evolve with 3 parents', function() {
    const parents = [[1, 2], [3, 4], [5, 6]].map(wrapGene)
    const expected = [[1, 4], [3, 6], [5, 2]]
    const r = new TestRandom(1)
    expect(Uniform(parents, r)).to.deep.equal(expected)
  })
})
