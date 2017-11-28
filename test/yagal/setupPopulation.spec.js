import 'babel-polyfill'
import { expect } from 'chai'
import _ from 'lodash'
import setupPopulation from '../../lib/yagal/setupPopulation'
import {
  inverseComparator,
  naturalComparator,
} from '../../lib/yagal/sortComparators'

function TestYagal() {}

TestYagal.prototype.setupPopulation = setupPopulation

TestYagal.prototype.updatePopulationStats = function(population) {
  population.updatedFromTestCall = true
}

describe('Yagal.setupPopulation', function() {
  it('should initialize population of 1', function() {
    const initialPopulation = [1]
    const fitFunc = i => i
    const ty = new TestYagal()
    const expected = {
      population: {
        fitness: {},
        genes: [{ born: 0, fitness: 1, gene: 1 }],
        updatedFromTestCall: true,
      },
      sortComparator: naturalComparator,
    }
    expect(ty.setupPopulation(initialPopulation, true, fitFunc)).to.deep.equal(
      expected,
    )
  })
  it('should initialize small natural population', function() {
    const initialPopulation = _.shuffle(_.range(5))
    const fitFunc = i => i * i
    const ty = new TestYagal()
    const expected = {
      population: {
        fitness: {},
        genes: _.range(5).map(i => ({ born: 0, fitness: i * i, gene: i })),
        updatedFromTestCall: true,
      },
      sortComparator: naturalComparator,
    }
    expect(ty.setupPopulation(initialPopulation, true, fitFunc)).to.deep.equal(
      expected,
    )
  })
  it('should initialize small natural population with negatives', function() {
    const initialPopulation = _.shuffle(_.range(5))
    const fitFunc = i => i * i - 15
    const ty = new TestYagal()
    const expected = {
      population: {
        fitness: {},
        genes: _.range(5).map(i => ({ born: 0, fitness: i * i - 15, gene: i })),
        updatedFromTestCall: true,
      },
      sortComparator: naturalComparator,
    }
    expect(ty.setupPopulation(initialPopulation, true, fitFunc)).to.deep.equal(
      expected,
    )
  })
  it('should initialize small inverse population', function() {
    const initialPopulation = _.shuffle(_.range(5))
    const fitFunc = i => i * i
    const ty = new TestYagal()
    const expectedGenes = _.range(5).map(i => ({
      born: 0,
      fitness: i * i,
      gene: i,
    }))
    expectedGenes.reverse()
    const expected = {
      population: {
        fitness: {},
        genes: expectedGenes,
        updatedFromTestCall: true,
      },
      sortComparator: inverseComparator,
    }
    expect(ty.setupPopulation(initialPopulation, false, fitFunc)).to.deep.equal(
      expected,
    )
  })
  it('should initialize small inverse population with negatives', function() {
    const initialPopulation = _.shuffle(_.range(5))
    const fitFunc = i => i * i - 15
    const ty = new TestYagal()
    const expectedGenes = _.range(5).map(i => ({
      born: 0,
      fitness: i * i - 15,
      gene: i,
    }))
    expectedGenes.reverse()
    const expected = {
      population: {
        fitness: {},
        genes: expectedGenes,
        updatedFromTestCall: true,
      },
      sortComparator: inverseComparator,
    }
    expect(ty.setupPopulation(initialPopulation, false, fitFunc)).to.deep.equal(
      expected,
    )
  })
})
