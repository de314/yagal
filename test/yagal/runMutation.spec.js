import 'babel-polyfill'
import { expect } from 'chai'
import _ from 'lodash'
import runMutation from '../../src/yagal/runMutation'

function TestYagal(opts) {
  _.assignIn(this, opts)
}

TestYagal.prototype._runMutation = runMutation

const testMutation = (count, selected) => ({
  count,
  select: () => selected,
  evolve: g => {
    selected.g = g
    selected.evolved++
  },
})

describe('Yagal._runMutation', function() {
  it('should skip run if not setup', function() {
    const ty = new TestYagal({})
    const population = {
      genes: _.range(4),
    }
    ty._runMutation({ count: 0 }, population)
    const expected = {
      genes: _.range(4),
    }
    expect(population).to.deep.equal(expected)
  })
  it("should not update if fitness doesn't change", function() {
    const ty = new TestYagal({ fitFunc: () => 0 })
    const population = {
      genes: _.range(4),
    }
    const gene = '10010'
    const selected = { gene, fitness: 0, evolved: 0 }
    ty._runMutation(testMutation(1, selected), population)
    const expected = {
      genes: _.range(4),
    }
    expect(selected.evolved).to.equal(1)
    expect(selected.g).to.equal(gene)
    expect(population).to.deep.equal(expected)
  })
  it('should run and update fitness', function() {
    const ty = new TestYagal({ fitFunc: () => 1000 })
    const population = {
      genes: _.range(4),
    }
    const gene = '10010'
    const selected = { gene, fitness: 0, evolved: 0 }
    ty._runMutation(testMutation(3, selected), population)
    const expected = {
      genes: _.range(4),
      isDirty: true,
    }
    expect(selected.evolved).to.equal(3)
    expect(selected.g).to.equal(gene)
    expect(population).to.deep.equal(expected)
  })
})
