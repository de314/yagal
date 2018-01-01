import _ from 'lodash'

export default function(mutation, population) {
  const { r, fitFunc } = this
  _.range(mutation.count).forEach(() => {
    const selected = mutation.select(population, r)
    selected.gene = mutation.evolve(selected.gene, r, selected, population, mutation)
    const newFitness = this.fitFunc(selected.gene)
    if (newFitness !== selected.fitness) {
      selected.fitness = newFitness
      population.isDirty = true
    }
  })
}
