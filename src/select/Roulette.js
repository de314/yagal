import _ from 'lodash'

const Roulette = (population, r) => {
  const totalFitness = _.sumBy(population, 'fitness')
  let sum = 0
  let rFit = r.randInt(totalFitness)
  for (let j = 0; j < population.length; j++) {
    sum += population[j].fitness
    if (sum > rFit) {
      return population[j]
    }
  }
  return _.last(population)
}

export default Roulette
