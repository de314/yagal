var _ = require('lodash')
var moment = require('moment')

/*
 * =============================================================================
 * Import
 */
var Yagal = require('yagal')
const SELECT = Yagal.SELECT
// or
// import Yagal from 'yagal'
// import SELECT from 'yagal/select'

/*
 * =============================================================================
 * Setup the Genetic Algorithm
 */
const algo = new Yagal({
  // Make sure that it does not run for ever
  maxGenerations: 100,
  // fitness is the number of 1's in the gene. Simple as counting them.
  fitFunc: gene => _.sum(gene),
  mutation: {
    probability: 0.2,
    select: SELECT.Tournament2,
    evolve: (gene, r) =>
      gene.map(bit => {
        // if the bit is alread on, low probability of turning it off
        if (bit === 1) {
          return Math.drand() < 0.1 ? 0 : 1
        }
        // if the bit is off, then some chance of turning it on
        return Math.drand() < 0.35 ? 1 : 0
      }),
  },
})

/*
 * =============================================================================
 * Create the initial population for the simulation
 */
// in this example a gene is just going to be an array of 1's and 0's
function randomGene(length) {
  return _.range(length).map(() => Math.drandInt(0, 2))
}
// create 100 random genes
const initialPopulation = _.range(100).map(() => randomGene(10))

/*
 * =============================================================================
 * Run the configured GA against the initial population
 */
const results = algo.run(initialPopulation)

/*
 * =============================================================================
 * Check the results
 */
console.log(`Started: ${moment(results.startTime).format('lll')}`)
console.log(`Duration: ${results.duration}ms`)
const finalPopulation = results.enrichedPopulation
const fitnessSummary = finalPopulation.fitness
console.log(`Max Fitness: ${fitnessSummary.max}`)
// Hurray, it evolved! Out max fitness is 10, which means that at least 1 gene consists of all 1's.
