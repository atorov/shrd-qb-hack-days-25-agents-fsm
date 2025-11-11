function splitIntoChunks(text: string, chunkSize = 2000) {
  const chunks: string[] = [];

  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.slice(i, i + chunkSize));
  }

  return chunks;
}

export default splitIntoChunks;
