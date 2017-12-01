import 'babel-polyfill'
import { expect } from 'chai'
import wrapGene from '../../src/yagal/wrapGene'

describe('Yaga::wrapGene', function() {
  it('should wrap', function() {
    const gene = '10011'
    const generation = 18
    const fitFunc = g => `${g}::${g.length}`
    const expected = {
      gene,
      born: generation,
      fitness: '10011::5',
    }
    expect(wrapGene(gene, generation, fitFunc)).to.deep.equal(expected)
  })
})
