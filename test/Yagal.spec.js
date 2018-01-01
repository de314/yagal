import 'babel-polyfill'
import { expect } from 'chai'
import _ from 'lodash'
import Drand from 'drand'
import Yagal from '../src/Yagal'
import SELECT from '../src/select'
import EVOLVE from '../src/evolve'

describe('Yagal Simulations', function() {
  it("should satisfy all 1's via mutation", function() {
    Drand.setGlobal(0)
    const expectedFitness = {
      min: 1,
      max: 10,
      offsetTotal: 666,
      offset: 0,
    }

    const maxGenerations = 100
    const popSize = 100
    const geneSize = 10

    const options = {
      r: new Drand(0),
      maxGenerations,
      maxDuration: 1000,
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
    }

    const algo = new Yagal(options)

    function randomGene(length) {
      return _.range(length).map(() => Math.drandInt(0, 2))
    }
    const initialPopulation = _.range(popSize).map(() => randomGene(geneSize))

    const results = algo.run(initialPopulation)
    const actualFitness = results.enrichedPopulation.fitness

    expect(results.generation).to.equal(maxGenerations)
    expect(actualFitness).to.deep.equal(expectedFitness)
  })
})
