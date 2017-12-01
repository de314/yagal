import 'babel-polyfill'
import { expect } from 'chai'
import _ from 'lodash'
import runCrossover from '../../lib/yagal/runCrossover'

function TestYagal(opts) {
  _.assignIn(this, opts)
}

TestYagal.prototype._runCrossover = runCrossover

function vals(...expected) {
  console.log({ expected })
  this.expected = expected
  this.index = 0
}

vals.prototype.get = function() {
  const that = this
  console.log({ that })
  return this.expected[this.index++ % this.expected.length]
}

const testSteadyState = (count, expected, state = { i: 0 }) => ({
  count,
  select: () => expected[state.i++ % expected.length],
})

const testCrossover = (elitism, steadyState, selected, evolve, state = { i: 0 }) => ({
  valid: true,
  select: () => selected[state.i++ % selected.length],
  evolve,
  elitism,
  steadyState,
})

describe('Yagal.runCrossover', function() {
  it('should skip invalid crossover', function() {
    const input = { genes: _.range(5) }
    const expected = { genes: _.range(5) }
    new TestYagal()._runCrossover({ valid: false }, input, 0, () => 0)
    expect(input).to.deep.equal(expected)
  })
  it('should return entire population for elitism probability 1', function() {
    const input = { genes: _.range(5) }
    const expected = { genes: _.range(5), isDirty: false }
    new TestYagal()._runCrossover(
      testCrossover({ count: 5 }, testSteadyState(0)),
      input,
      0,
      () => 0,
    )
    expect(input).to.deep.equal(expected)
  })
  it('should return entire population for steadyState probability 1', function() {
    const input = { genes: _.range(5) }
    const expected = { genes: _.range(5), isDirty: true }
    new TestYagal()._runCrossover(
      testCrossover({ count: 0 }, testSteadyState(5, input.genes)),
      input,
      0,
      () => 0,
    )
    expect(input).to.deep.equal(expected)
  })
  it('should return entire population when elitism+steadyState=1', function() {
    const input = { genes: _.range(5) }
    const expected = { genes: _.range(5), isDirty: true }
    new TestYagal()._runCrossover(
      testCrossover({ count: 2 }, testSteadyState(3, [2, 3, 4])),
      input,
      0,
      () => 0,
    )
    expect(input).to.deep.equal(expected)
  })
  it('should build entire population with single parent select function', function() {
    const population = { genes: _.range(5) }
    const expected = {
      genes: _.range(5).map(gene => ({ gene, born: 18, fitness: 101 })),
      isDirty: true,
    }
    const crossover = testCrossover({ count: 0 }, testSteadyState(0), population.genes, p => p)
    new TestYagal({ fitFunc: () => 101 })._runCrossover(crossover, population, 18)
    expect(population).to.deep.equal(expected)
  })
  it('should build entire population with parent pair select function', function() {
    const population = { genes: _.range(5) }
    const expected = {
      genes: _.range(5).map(g => ({ gene: g + 1, born: 18, fitness: 101 })),
      isDirty: true,
    }
    const crossover = testCrossover(
      { count: 0 },
      testSteadyState(0),
      _.range(5).map(n => [n, n + 1]),
      p => p[1],
    )
    new TestYagal({ fitFunc: () => 101 })._runCrossover(crossover, population, 18)
    expect(population).to.deep.equal(expected)
  })
  it('should build entire population with parent triplet select function', function() {
    const population = { genes: _.range(5) }
    const expected = {
      genes: _.range(5).map(g => ({ gene: g * 2, born: 18, fitness: 101 })),
      isDirty: true,
    }
    const crossover = testCrossover(
      { count: 0 },
      testSteadyState(0),
      _.range(5).map(n => [n, n + 1, n * 2]),
      p => p[2],
    )
    new TestYagal({ fitFunc: () => 101 })._runCrossover(crossover, population, 18)
    expect(population).to.deep.equal(expected)
  })
  it('should build entire population with multi child evolve function', function() {
    const population = { genes: _.range(5) }
    const expected = {
      genes: [-1, 1, 0, 2, 1].map(gene => ({ gene, born: 18, fitness: 101 })),
      isDirty: true,
    }
    const crossover = testCrossover(
      { count: 0 },
      testSteadyState(0),
      _.range(3).map(n => [n - 1, n + 1]),
      p => p,
    )
    new TestYagal({ fitFunc: () => 101 })._runCrossover(crossover, population, 18)
    expect(population).to.deep.equal(expected)
  })
  it('should build population with non-zero elitist probability', function() {
    const population = { genes: _.range(5) }
    const expected = {
      genes: [0, 1, ...[47, 101, 202].map(gene => ({ gene, born: 18, fitness: 101 }))],
      isDirty: true,
    }
    const crossover = testCrossover({ count: 2 }, testSteadyState(0), [47, 101, 202], p => p)
    new TestYagal({ fitFunc: () => 101 })._runCrossover(crossover, population, 18)
    expect(population).to.deep.equal(expected)
  })
  it('should build population with non-zero stableState probability', function() {
    const population = { genes: _.range(5) }
    const expected = {
      genes: [...[47, 101, 202].map(gene => ({ gene, born: 18, fitness: 101 })), 3, 1],
      isDirty: true,
    }
    const crossover = testCrossover(
      { count: 0 },
      testSteadyState(2, [3, 1]),
      [47, 101, 202],
      p => p,
    )
    new TestYagal({ fitFunc: () => 101 })._runCrossover(crossover, population, 18)
    expect(population).to.deep.equal(expected)
  })
  it('should build population with non-zero probabilities', function() {
    const population = { genes: _.range(5) }
    const expected = {
      genes: [0, ...[47, 101].map(gene => ({ gene, born: 18, fitness: 101 })), 3, 1],
      isDirty: true,
    }
    const crossover = testCrossover(
      { count: 1 },
      testSteadyState(2, [3, 1]),
      [47, 101, 202],
      p => p,
    )
    new TestYagal({ fitFunc: () => 101 })._runCrossover(crossover, population, 18)
    expect(population).to.deep.equal(expected)
  })
})
