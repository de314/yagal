import _ from 'lodash'

export default function(mutation, populationCount) {
  if (!_.isNumber(populationCount) || populationCount <= 0) {
    throw new Error(
      `Population count must be a positive number but was ${populationCount}`,
    )
  }
  if (_.isPlainObject(mutation)) {
    const { select, evolve, probability } = mutation
    if (
      _.isFunction(select) &&
      _.isFunction(evolve) &&
      _.isNumber(probability) &&
      probability > 0
    ) {
      return {
        select,
        evolve,
        probability,
        count: Math.ceil(populationCount * probability),
      }
    }
  }
  return {
    probability: 0,
    count: 0,
  }
}
