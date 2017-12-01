import 'babel-polyfill'
import { expect } from 'chai'
import setupCrossover from '../../src/yagal/setupCrossover'
import Uniform from '../../src/select/Uniform'

const noop = () => {}
const select = noop
const evolve = noop

const noopElitism = {
  probability: 0,
  count: 0,
}

const noopSteadyState = {
  probability: 0,
  count: 0,
  select: Uniform,
}

const EMPTY = {
  valid: false,
  elitism: noopElitism,
  steadyState: noopSteadyState,
}

describe('Yagal.setupCrossover', function() {
  it('should throw if missing populationCount', function() {
    expect(() => setupCrossover()).to.throw()
  })
  it('should throw if zero populationCount', function() {
    expect(() => setupCrossover(null, 0)).to.throw()
  })
  it('should not setup if missing crossover object', function() {
    expect(setupCrossover(null, 100)).to.deep.equal(EMPTY)
  })
  it('should not setup if invalid crossover object', function() {
    expect(setupCrossover([], 100)).to.deep.equal(EMPTY)
  })
  it('should not setup if missing select function', function() {
    expect(setupCrossover({}, 100)).to.deep.equal(EMPTY)
  })
  it('should not setup if invalid select function', function() {
    expect(setupCrossover({ select: false }, 100)).to.deep.equal(EMPTY)
  })
  it('should not setup if missing evolve function', function() {
    expect(setupCrossover({ select }, 100)).to.deep.equal(EMPTY)
  })
  it('should not setup if invalid select function', function() {
    expect(setupCrossover({ select, evolve: false }, 100)).to.deep.equal(EMPTY)
  })

  it('should use default if missing elitism', function() {
    const expected = { ...EMPTY, select, evolve, valid: true }
    expected.steadyState = { select, probability: 0.25, count: 25 }
    expect(
      setupCrossover({ select, evolve, steadyState: { select, probability: 0.25 } }, 100),
    ).to.deep.equal(expected)
  })
  it('should not setup if invalid elitism probability', function() {
    expect(
      setupCrossover(
        { select, evolve, elitism: { probability: -1 }, steadyState: noopSteadyState },
        100,
      ),
    ).to.deep.equal(EMPTY)
  })
  it('should use default if missing steadyState', function() {
    const expected = { ...EMPTY, select, evolve, valid: true }
    expected.elitism = { probability: 0.34, count: 34 }
    expect(setupCrossover({ select, evolve, elitism: { probability: 0.34 } }, 100)).to.deep.equal(
      expected,
    )
  })
  it('should not setup if invalid steadyState probability', function() {
    expect(
      setupCrossover(
        { select, evolve, elitism: noopElitism, steadyState: { probability: -1, select } },
        100,
      ),
    ).to.deep.equal(EMPTY)
  })
  it('should not setup if invalid steadyState select', function() {
    expect(
      setupCrossover(
        { select, evolve, elitism: noopElitism, steadyState: { probability: 0.25, select: -42 } },
        100,
      ),
    ).to.deep.equal(EMPTY)
  })
  it('should setup with valid input', function() {
    const input = {
      select,
      evolve,
      elitism: { probability: 0.1 },
      steadyState: { probability: 0.333, select },
    }
    const expected = {
      valid: true,
      select,
      evolve,
      elitism: { probability: 0.1, count: 10 },
      steadyState: { select, probability: 0.333, count: 30 },
    }
    expect(setupCrossover(input, 100)).to.deep.equal(expected)
  })
})
