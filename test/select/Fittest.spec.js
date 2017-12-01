import 'babel-polyfill'
import { expect } from 'chai'
import SELECT from '../../src/select'

const Fittest = SELECT.Fittest

describe('SELECT.Fittest', function() {
  it('should return in population of 1', function() {
    const gene = '10011'
    const pop = { genes: [gene] }
    expect(Fittest(pop, null)).to.equal(gene)
  })
  it('should return in large population', function() {
    const gene = '10011'
    const pop = { genes: [gene, 1, 2, 3, 4, 5, 6, 7] }
    expect(Fittest(pop, null)).to.equal(gene)
  })
})
