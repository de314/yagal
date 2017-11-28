import 'babel-polyfill'
import _ from 'lodash'
import { expect } from 'chai'
import SELECT from '../../lib/select'

const Fittest = SELECT.Fittest

describe('SELECT.Fittest', function() {
  it('should return in population of 1', function() {
    const gene = '10011'
    const pop = [gene]
    expect(Fittest(pop, null)).to.equal(gene)
  })
  it('should return in large population', function() {
    const gene = '10011'
    const pop = [gene, 1, 2, 3, 4, 5, 6, 7]
    expect(Fittest(pop, null)).to.equal(gene)
  })
})
