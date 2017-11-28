import sortComparators from './sortComparators'

const wrapGene = (gene, generation, fitFunc) => ({
  gene,
  born: generation,
  fitness: fitFunc(gene),
})

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
