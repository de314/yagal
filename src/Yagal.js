import _ from 'lodash'
import Random from './Random'
import updatePopulationStats from './yagal/updatePopulationStats'
import setupPopulation from './yagal/setupPopulation'
import setupMutation from './yagal/setupMutation'
import runMutation from './yagal/runMutation'
import setupCrossover from './yagal/setupCrossover'
import runCrossover from './yagal/runCrossover'

import Fittest from './select/Fittest'
import Identity from './evolve/Identity'

const defaultOpts = {
  maxGenerations: Number.MAX_SAFE_INTEGER,
  maxDuration: 10 * 1000, // 10 seconds
  natural: false,
  optimizations: {
    skipPopulationStats: false,
    skipNormalizedFitness: false,
  },
  mutation: {
    probability: 0,
  },
  crossover: {
    elitism: {
      probability: 0,
    },
    steadyState: {
      probability: 0,
    },
  },
}

function Yagal(opts) {
  _.assignIn(this, defaultOpts, opts)
  if (_.isNil(this.r)) {
    this.r = new Random(this.seed)
  }
  if (!_.isFunction(this.fitFunc)) {
    throw new Error('fitFunc is a required fucntion')
  }
}

Yagal.prototype.run = function(initialPopulation) {
  if (!_.isArray(initialPopulation) || initialPopulation.length < 1) {
    throw new Error('Population is required')
  }
  const { population, sortComparator } = this._setupPopulation(
    initialPopulation,
    this.natural,
    this.fitFunc,
  )

  const mutation = this._setupMutation(this.mutation, initialPopulation.length)
  const crossover = this._setupCrossover(this.crossover, initialPopulation.length)

  const { maxGenerations, maxDuration } = this
  let startTime = new Date().getTime()
  let duration = 0
  let generation = 0

  while (generation < maxGenerations && duration < maxDuration) {
    this._runCrossover(crossover, population, generation)

    this._runMutation(mutation, population)

    if (population.isDirty) {
      population.isDirty = false
      this._updatePopulationStats(population)
      population.genes.sort(sortComparator)
    }
    duration = new Date().getTime() - startTime
  }

  return {
    generation,
    startTime,
    duration,
    population: population.genes.map(candidate => candidate.gene),
    enrichedPopulation: population,
  }
}

Yagal.prototype._setupPopulation = setupPopulation
Yagal.prototype._updatePopulationStats = updatePopulationStats
Yagal.prototype._setupMutation = setupMutation
Yagal.prototype._runMutation = runMutation
Yagal.prototype._setupCrossover = setupCrossover
Yagal.prototype._runCrossover = runCrossover

const naturalComparator = (geneA, geneB) => geneB.fitness - geneA.fitness
const inverseComparator = (geneA, geneB) => geneA.fitness - geneB.fitness

export default Yagal
