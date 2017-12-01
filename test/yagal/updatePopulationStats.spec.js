import 'babel-polyfill'
import { expect } from 'chai'
import _ from 'lodash'
import updatePopulationStats from '../../src/yagal/updatePopulationStats'

function TestYagal(opts) {
  _.assignIn(this, { optimizations: {} }, opts)
}

TestYagal.prototype._updatePopulationStats = updatePopulationStats

describe('Yagal.updatePopulationStats', function() {
  it('should skip update', function() {
    const yagal = new TestYagal({
      optimizations: {
        skipPopulationStats: true,
      },
    })
    const population = {
      genes: [],
    }
    const expected = {
      size: 0,
      genes: [],
    }
    yagal._updatePopulationStats(population)
    expect(population).to.deep.equal(expected)
  })
  it('should skip normalization', function() {
    const yagal = new TestYagal({
      optimizations: {
        skipNormalizedFitness: true,
      },
    })
    const population = {
      genes: [{ fitness: 1 }],
      fitness: {},
    }
    const expected = {
      size: 1,
      genes: [{ fitness: 1 }],
      fitness: {
        min: 1,
        max: 1,
      },
    }
    yagal._updatePopulationStats(population)
    expect(population).to.deep.equal(expected)
  })
  it('should update with single gene', function() {
    const yagal = new TestYagal({})
    const population = {
      genes: [{ fitness: 1 }],
      fitness: {},
    }
    const expected = {
      size: 1,
      genes: [{ fitness: 1, normFitness: 1 }],
      fitness: {
        min: 1,
        max: 1,
        offset: 0,
        offsetTotal: 1,
      },
    }
    yagal._updatePopulationStats(population)
    expect(population).to.deep.equal(expected)
  })
  it('should update with small population', function() {
    const yagal = new TestYagal({})
    const population = {
      genes: _.range(4).map(() => ({ fitness: 1 })),
      fitness: {},
    }
    const expected = {
      size: 4,
      genes: _.range(4).map(() => ({ fitness: 1, normFitness: 0.25 })),
      fitness: {
        min: 1,
        max: 1,
        offset: 0,
        offsetTotal: 4,
      },
    }
    yagal._updatePopulationStats(population)
    expect(population).to.deep.equal(expected)
  })
  it('should update with 0 total fitness', function() {
    const yagal = new TestYagal({})
    const population = {
      genes: _.range(4).map(() => ({ fitness: 0 })),
      fitness: {},
    }
    const expected = {
      size: 4,
      genes: _.range(4).map(() => ({ fitness: 0 })),
      fitness: {
        min: 0,
        max: 0,
        offset: 0,
        offsetTotal: 0,
      },
    }
    yagal._updatePopulationStats(population)
    expect(population).to.deep.equal(expected)
  })
  it('should update with diverse population', function() {
    const yagal = new TestYagal({})
    const population = {
      genes: _.range(4).map(i => ({ fitness: i * i })),
      fitness: {},
    }
    const expected = {
      size: 4,
      genes: [
        { fitness: 0, normFitness: 0 },
        { fitness: 1, normFitness: 0.07142857142857142 },
        { fitness: 4, normFitness: 0.2857142857142857 },
        { fitness: 9, normFitness: 0.6428571428571429 },
      ],
      fitness: {
        min: 0,
        max: 9,
        offset: 0,
        offsetTotal: 14,
      },
    }
    yagal._updatePopulationStats(population)
    expect(population).to.deep.equal(expected)
  })
  it('should update with positive/negative fitness', function() {
    const yagal = new TestYagal({})
    const population = {
      genes: _.range(4).map(i => ({ fitness: i * i - 5 })),
      fitness: {},
    }
    const expected = {
      size: 4,
      genes: [
        { fitness: -5, normFitness: 0 },
        { fitness: -4, normFitness: 0.07142857142857142 },
        { fitness: -1, normFitness: 0.2857142857142857 },
        { fitness: 4, normFitness: 0.6428571428571429 },
      ],
      fitness: {
        min: -5,
        max: 4,
        offset: 5,
        offsetTotal: 14,
      },
    }
    yagal._updatePopulationStats(population)
    expect(population).to.deep.equal(expected)
  })
})
