export const naturalComparator = (geneA, geneB) => geneA.fitness - geneB.fitness
export const inverseComparator = (geneA, geneB) => geneB.fitness - geneA.fitness

export default natural => (natural ? naturalComparator : inverseComparator)
