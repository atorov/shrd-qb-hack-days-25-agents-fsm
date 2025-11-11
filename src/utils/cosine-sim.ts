import dotProduct from './dot-product';

function cosineSim(
  a: number[] | Float32Array,
  b: number[] | Float32Array
): number {
  return dotProduct(a, b); // normalized embeddings
}

export default cosineSim;
