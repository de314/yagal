import 'babel-polyfill'
import { expect } from 'chai'
import EVOLVE from '../../lib/evolve'

const Identity = EVOLVE.Identity

const wrapGene = (gene, fitness = 0) => ({
  gene,
  fitness,
})

describe('EVOLVE.Identity', function() {
  it('should evolve with 1 parent', function() {
    const genes = [1]
    const parents = genes.map(wrapGene)
    expect(Identity(parents, null)).to.deep.equal(genes)
  })
  it('should evolve with 2 parents', function() {
    const genes = [6, 8]
    const parents = genes.map(wrapGene)
    expect(Identity(parents, null)).to.deep.equal(genes)
  })
  it('should evolve with 3 parents', function() {
    const genes = [6, 8, 2]
    const parents = genes.map(wrapGene)
    expect(Identity(parents, null)).to.deep.equal(genes)
  })
  it('should evolve with 5 parents', function() {
    const genes = [6, 8, 3, 7, 1]
    const parents = genes.map(wrapGene)
    expect(Identity(parents, null)).to.deep.equal(genes)
  })
})
