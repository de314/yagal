import 'babel-polyfill'
import { expect } from 'chai'
import setupMutation from '../../src/yagal/setupMutation'

const EMPTY = {
  probability: 0,
  count: 0,
}

const noop = () => {}
const select = noop
const evolve = noop

describe('Yagal.setupMutation', function() {
  it('should throw if missing populationCount', function() {
    expect(() => setupMutation()).to.throw()
  })
  it('should throw if zero populationCount', function() {
    expect(() => setupMutation(null, 0)).to.throw()
  })
  it('should not setup if missing mutation object', function() {
    expect(setupMutation(null, 100)).to.deep.equal(EMPTY)
  })
  it('should not setup if invalid mutation object', function() {
    expect(setupMutation([], 100)).to.deep.equal(EMPTY)
  })
  it('should not setup if missing select function', function() {
    expect(setupMutation({}, 100)).to.deep.equal(EMPTY)
  })
  it('should not setup if invalid select function', function() {
    expect(setupMutation({ select: false }, 100)).to.deep.equal(EMPTY)
  })
  it('should not setup if missing evolve function', function() {
    expect(setupMutation({ select }, 100)).to.deep.equal(EMPTY)
  })
  it('should not setup if invalid select function', function() {
    expect(setupMutation({ select, evolve: false }, 100)).to.deep.equal(EMPTY)
  })
  it('should not setup if missing probability', function() {
    expect(setupMutation({ select, evolve }, 100)).to.deep.equal(EMPTY)
  })
  it('should not setup if invalid probability', function() {
    expect(
      setupMutation({ select, evolve, probability: noop }, 100),
    ).to.deep.equal(EMPTY)
  })
  it('should not setup if zero probability', function() {
    expect(
      setupMutation({ select, evolve, probability: 0 }, 100),
    ).to.deep.equal(EMPTY)
  })
  it('should not setup if negative probability', function() {
    expect(
      setupMutation({ select, evolve, probability: -1 }, 100),
    ).to.deep.equal(EMPTY)
  })
  it('should setup with valid input', function() {
    const expected = { select, evolve, probability: 0.5, count: 50 }
    expect(
      setupMutation({ select, evolve, probability: 0.5 }, 100),
    ).to.deep.equal(expected)
  })
})
