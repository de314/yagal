const wrapGene = (gene, generation, fitFunc) => ({
  gene,
  born: generation,
  fitness: fitFunc(gene),
})

export default wrapGene
