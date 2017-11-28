import _ from 'lodash'
import Identity from './Identity'

const SinglePoint = (parents, r) => {
  const pGenes = Identity(parents, r)
  const count = pGenes.length
  if (count <= 1) {
    throw new Error(`Expected > 1 parent but found ${count}`)
  } else if (!_.isArray(pGenes[0])) {
    throw new Error(
      `The built-in SinglePoint evolution can only operate on arrays, but found "${typeof pGenes[0]}" ex: ${JSON.stringify(
        pGenes[0],
      )}`,
    )
  }
  const singlePointIndex = r.randInt(pGenes[0].length)
  const children = []
  for (let i = 0; i < count; i++) {
    children.push([])
    for (let j = 0; j < singlePointIndex; j++) {
      children[i].push(pGenes[i][j])
    }
  }
  for (let i = 0; i < count; i++) {
    const _i = (i + 1) % count
    for (let j = singlePointIndex; j < pGenes[0].length; j++) {
      children[i].push(pGenes[_i][j])
    }
  }
  return children
}

export default SinglePoint
