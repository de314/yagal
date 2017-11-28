import _ from 'lodash'
import Identity from './Identity'

const Uniform = (parents, r) => {
  const pGenes = Identity(parents, r)
  const count = pGenes.length
  if (count > 1 && !_.isArray(pGenes[0])) {
    throw new Error(
      `The built-in SinglePoint evolution can only operate on arrays, but found "${typeof pGenes[0]}" ex: ${JSON.stringify(
        pGenes[0],
      )}`,
    )
  }
  if (count > 1) {
    const children = []
    for (let i = 0; i < count; i++) {
      children.push([])
      for (let j = 0; j < pGenes[0].length; j++) {
        children[i].push(pGenes[(i + j) % count][j])
      }
    }
    return children
  }
  return pGenes
}

export default Uniform
