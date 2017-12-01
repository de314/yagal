import 'babel-polyfill'
import { expect } from 'chai'
import TestRandom from '../TestRandom'
import EVOLVE from '../../src/evolve'

const SinglePoint = EVOLVE.SinglePoint

const wrapGene = (gene, fitness = 0) => ({
  gene,
  fitness,
})

describe('EVOLVE.SinglePoint', function() {
  it('should error with 1 parent', function() {
    const genes = [[1, 2, 3, 4]]
    const parents = genes.map(wrapGene)
    expect(() => SinglePoint(parents, null)).to.throw()
  })
  it('should error with non-array genes', function() {
    const genes = [1, 2, 3, 4]
    const parents = genes.map(wrapGene)
    expect(() => SinglePoint(parents, null)).to.throw()
  })
  it('should evolve with 2 parents', function() {
    const parents = [[1, 2], [3, 4]].map(wrapGene)
    const expected = [[1, 4], [3, 2]]
    const r = new TestRandom(1)
    expect(SinglePoint(parents, r)).to.deep.equal(expected)
  })
  it('should evolve with 2 parents with long genes', function() {
    const parents = [[1, 2, 3, 4], [-1, -2, -3, -4]].map(wrapGene)
    const expected = [[1, 2, -3, -4], [-1, -2, 3, 4]]
    const r = new TestRandom(2)
    expect(SinglePoint(parents, r)).to.deep.equal(expected)
  })
  it('should evolve with 3 parents', function() {
    const parents = [[1, 2], [3, 4], [5, 6]].map(wrapGene)
    const expected = [[1, 4], [3, 6], [5, 2]]
    const r = new TestRandom(1)
    expect(SinglePoint(parents, r)).to.deep.equal(expected)
  })
})
