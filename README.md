# yagal

Yet Another Genetic Algorithm Library

## Installation

`npm install --save yagal`

## Usage

## Examples

### All 1's via Mutation

The following example generates a population of genes represented by arrays of 0's and 1's. The
fitness is calculated by the number of 1 bits. The mutation function will randomly flip bits.

```javascript
import Yagal from 'yagal'
import SELECT from 'yagal/select'

const options = {
  maxGenerations: 100,
  fitFunc: (gene) => {
    let sum = 0
    for (let i = 0; i < gene.length; i++) {
      sum += gene[i]
    }
    return sum
  }
  mutation: {
    probability: 0.1,
    select: SELECT.Tournament2,
    evolve: (gene, r) => {
      const bitsToFlip = r.randInt(gene.length)
      for (let i = 0; i < bitsToFlip; i++) {
        gene[r.randInt(gene.length)] ^= 1
      }
      return gene
    }
  },
}

const algo = new Yagal(options)

function randomGene(length = 10) {
  return _.range(length).map(() => Math.random() < 0.5 ? 0 : 1)
}
const initialPopulation = _.range(100).map(() => randomGene())

const results = algo.run(initialPopulation)
const { generation, startTime, duration, population, enrichedPopulation } = results
```

### All 1's via Crossover

```javascript
import Yagal from 'yagal'
import SELECT from 'yagal/select'
import EVOLVE from 'yagal/evolve'

const options = {
  maxGenerations: 100,
  fitFunc: gene => {
    let sum = 0
    for (let i = 0; i < gene.length; i++) {
      sum += gene[i]
    }
    return sum
  },
  crossover: {
    select: SELECT.Tournament2,
    evolve: EVOLVE.Uniform,
    elitism: {
      probability: 0.1,
    },
    steadyState: {
      probability: 0.2,
      select: SELECT.Uniform,
    },
  },
}

const algo = new Yagal(options)

function randomGene(length = 10) {
  return _.range(length).map(() => (Math.random() < 0.5 ? 0 : 1))
}
const initialPopulation = _.range(100).map(() => randomGene())

const results = algo.run(initialPopulation)
const { generation, startTime, duration, population, enrichedPopulation } = results
```

## Contributing

Fork and clone the repo. Make your changes and submit a pull request back to the `master` branch.

## License

MIT License

Copyright (c) 2017 David Esposito

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
