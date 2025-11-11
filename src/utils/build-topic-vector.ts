import type { FeatureExtractionPipeline } from '@huggingface/transformers';
import averageVectors from './average-vectors';
import getEmbedding from './get-embedding';

async function buildTopicVector(
  extractor: FeatureExtractionPipeline,
  texts: string[]
): Promise<Float32Array> {
  const vectors: Float32Array[] = [];
  for (const t of texts) {
    const emb = await getEmbedding(extractor, t);
    vectors.push(emb);
  }

  return averageVectors(vectors);
}

export default buildTopicVector;
