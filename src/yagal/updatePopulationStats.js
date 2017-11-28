import _ from 'lodash'

const updatePopulationStats = function(population) {
  population.size = population.genes.length
  if (!this.optimizations.skipPopulationStats) {
    const genes = population.genes
    let min = Number.MAX_SAFE_INTEGER
    let max = Number.MIN_SAFE_INTEGER
    let tempFitness
    for (let i = 0; i < genes.length; i++) {
      tempFitness = genes[i].fitness
      min = Math.min(min, tempFitness)
      max = Math.max(max, tempFitness)
    }
    _.assignIn(population.fitness, {
      min,
      max,
    })
    if (!this.optimizations.skipNormalizedFitness) {
      const offset = min < 0 ? -min : 0
      let offsetTotal = 0
      let g
      for (let i = 0; i < genes.length; i++) {
        offsetTotal += genes[i].fitness + offset
      }
      offsetTotal *= 1.0
      if (offsetTotal > 0) {
        for (let i = 0; i < genes.length; i++) {
          g = genes[i]
          g.normFitness = (g.fitness + offset) / offsetTotal
        }
      }
      _.assignIn(population.fitness, {
        offsetTotal,
        offset,
      })
    }
  }
}

export default updatePopulationStats
