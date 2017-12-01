import _ from 'lodash'
import wrapGene from './wrapGene'

export default function(crossover, population, generation) {
  if (crossover.valid) {
    const { r, fitFunc } = this
    const { elitism, steadyState } = crossover
    let genes = population.genes

    const newGenes = genes.slice(0, elitism.count)
    let parents, children, maxToAdd, i
    while (newGenes.length < genes.length - steadyState.count) {
      parents = crossover.select(genes, this.r)
      children = crossover.evolve(parents, this.r)
      if (_.isArray(children)) {
        maxToAdd = -newGenes.length
        for (i = 0; i < children.length; i++) {
          if (newGenes.length < genes.length - steadyState.count) {
            newGenes.push(wrapGene(children[i], generation, fitFunc))
          }
        }
      } else {
        newGenes.push(wrapGene(children, generation, fitFunc))
      }
    }

    genes = genes.slice(elitism.count)
    let selected
    _.range(steadyState.count).map(() => {
      selected = steadyState.select(genes, this.r)
      newGenes.push(selected)
      genes.splice(genes.findIndex(i => i === selected), 1)
    })

    population.genes = newGenes
    population.isDirty = elitism.count !== population.genes.length
  }
}
