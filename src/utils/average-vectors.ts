function averageVectors(vectors: Float32Array[]) {
  const dim = vectors[0].length;
  const avg = new Float32Array(dim);
  const n = vectors.length;

  for (let j = 0; j < n; j++) {
    const v = vectors[j];
    for (let i = 0; i < dim; i++) avg[i] += v[i];
  }

  for (let i = 0; i < dim; i++) avg[i] /= n;

  // Normalize the averaged vector
  let magnitude = 0;
  for (let i = 0; i < dim; i++) {
    magnitude += avg[i] * avg[i];
  }
  magnitude = Math.sqrt(magnitude);

  if (magnitude > 0) {
    for (let i = 0; i < dim; i++) {
      avg[i] /= magnitude;
    }
  }

  return avg;
}

export default averageVectors;
