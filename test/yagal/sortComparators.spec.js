import 'babel-polyfill'
import { expect } from 'chai'
import _ from 'lodash'
import sortComparators, {
  inverseComparator,
  naturalComparator,
} from '../../lib/yagal/sortComparators'

const wrapGene = fitness => ({ fitness })

describe('sortComparator', function() {
  describe('natural', function() {
    it('should sort reversed array', function() {
      const actual = _.range(5).map(wrapGene)
      actual.reverse()
      const expected = _.range(5).map(wrapGene)
      actual.sort(naturalComparator)
      expect(actual).to.deep.equal(expected)
    })
    it('should sort shuffeled array', function() {
      const actual = _.shuffle(_.range(5).map(wrapGene))
      const expected = _.range(5).map(wrapGene)
      actual.sort(naturalComparator)
      expect(actual).to.deep.equal(expected)
    })
  })
  describe('inverse', function() {
    it('should sort ordered array', function() {
      const actual = _.range(5).map(wrapGene)
      let expected = _.range(5).map(wrapGene)
      expected.reverse()
      actual.sort(inverseComparator)
      expect(actual).to.deep.equal(expected)
    })
    it('should sort shuffeled array', function() {
      const actual = _.shuffle(_.range(5).map(wrapGene))
      let expected = _.range(5).map(wrapGene)
      expected.reverse()
      actual.sort(inverseComparator)
      expect(actual).to.deep.equal(expected)
    })
  })
  describe('getter', function() {
    it('should return natural', function() {
      expect(sortComparators(true)).to.equal(naturalComparator)
    })
    it('should return inverse', function() {
      expect(sortComparators(false)).to.equal(inverseComparator)
    })
  })
})
