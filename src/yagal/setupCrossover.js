import _ from 'lodash'
import Uniform from '../select/Uniform'

const ZERO_PROBABILITY = {
  probability: 0,
}

const defaultElitism = {
  probability: 0,
  count: 0,
}

const defaultSteadyState = {
  probability: 0,
  count: 0,
  select: Uniform,
}

const validateSelector = selector =>
  _.isPlainObject(selector) &&
  _.isNumber(selector.probability) &&
  selector.probability >= 0 &&
  selector.probability <= 1

export default (crossover, populationCount) => {
  if (!_.isNumber(populationCount) || populationCount <= 0) {
    throw new Error(`Population count must be a positive number but was ${populationCount}`)
  }
  if (_.isPlainObject(crossover)) {
    const { select, evolve, elitism = defaultElitism, steadyState = defaultSteadyState } = crossover
    if (
      _.isFunction(select) &&
      _.isFunction(evolve) &&
      validateSelector(elitism) &&
      validateSelector(steadyState) &&
      _.isFunction(steadyState.select)
    ) {
      const elitismCount = Math.ceil(populationCount * elitism.probability)
      return {
        valid: true,
        select,
        evolve,
        elitism: {
          ...defaultElitism,
          ...elitism,
          count: elitismCount,
        },
        steadyState: {
          ...defaultSteadyState,
          ...steadyState,
          count: Math.ceil((populationCount - elitismCount) * steadyState.probability),
        },
      }
    }
  }
  return {
    valid: false,
    elitism: { ...defaultElitism },
    steadyState: { ...defaultSteadyState },
  }
}
