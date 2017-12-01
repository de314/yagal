import sortComparators from './sortComparators'
import wrapGene from './wrapGene'

const setupPopulation = function(initialPopulation, natural, fitFunc) {
  let population = {
    fitness: {},
    genes: initialPopulation.map(gene => wrapGene(gene, 0, fitFunc)),
  }
  const sortComparator = sortComparators(natural)
  population.genes.sort(sortComparator)
  this.updatePopulationStats(population)
  return {
    population,
    sortComparator,
  }
}

export default setupPopulation
