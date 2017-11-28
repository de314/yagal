import _ from 'lodash'

const Roulette = (population, r) => {
  const genes = population.genes
  const totalFitness = _.sumBy(genes, 'fitness')
  let sum = 0
  let rFit = r.randInt(totalFitness)
  for (let j = 0; j < genes.length; j++) {
    sum += genes[j].fitness
    if (sum > rFit) {
      return genes[j]
    }
  }
  return _.last(genes)
}

export default Roulette
