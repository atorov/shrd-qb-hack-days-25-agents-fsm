function dotProduct(
  a: number[] | Float32Array,
  b: number[] | Float32Array
): number {
  let sum = 0;
  const len = a.length;
  for (let i = 0; i < len; i++) sum += a[i] * b[i];

  return sum;
}

export default dotProduct;
